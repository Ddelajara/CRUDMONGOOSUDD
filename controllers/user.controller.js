import {User} from '../models/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(404).json({message: 'No pudimos encontrar los usuarios'})
    }
}

export const signUp = async (req, res) => {
    try {
        const {nombre, apellido, rut, correo, direccion, codigoPostal, password} = req.body;
        
        if(!nombre || !apellido || !rut || !correo || !codigoPostal || !password || !direccion)
        {
            return res.status(400).json({message : "Debes completar toda la información"})
        }

        const verifyUser = await User.findOne({rut: rut})
        if(verifyUser){
            return  res.status(501).json({message: "Usuario ya se encuentra registrado en la base de datos"})
        }

        const passwordEncrypt = await bcrypt.hash(password, 10)

        const user = new User({
            nombre,
            apellido,
            rut,
            correo,
            direccion,
            codigoPostal,
            password: passwordEncrypt
        })

        const saveUser = await user.save();
        res.status(201).json({message: `El usuario ${saveUser.nombre} ${saveUser.apellido} ha sido creado con éxito`})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'No pudimos crear el usuario'})
    }
}

export const login = async(req, res) =>{
try {
    const {correo, password} = req.body;
    const verifyUserByCorreo = await User.findOne({correo: correo})
    if (!verifyUserByCorreo )
    {
        return res.status(404).json({message: 'Correo de usuario no existe en nuestra base de datos'})
    }
    
    const verifyPassword = await bcrypt.compare(password, verifyUserByCorreo.password);
    if (!verifyPassword){
        return res.status(403).json({message:'Contraseña incorrecta'});
    }

    const expireTime = Math.floor(new Date() / 1000) + 3600

    const {_id, nombre, apellido, rut, codigoPostal, direccion } = verifyUserByCorreo
    const token = jwt.sign({
        exp: expireTime,
        data: {
            id: _id,
            correo: correo,
            nombre: nombre,
            apellido: apellido,
            rut: rut,
            codigoPostal : codigoPostal,
            direccion: direccion
        }
    }, process.env.SECRET_KEY)

    res.json(token)

} catch (error) {
    res.status(403).json({message: 'No pudimos verificar tu cuenta'})
}
}

export const updateUser = async(req, res) => {

    try {
        const userRut = req.params.rut
        const updatedData =  req.body

        const updateUser = await User.findOneAndUpdate({ rut: userRut}, updatedData, {new: true} )

        if (!updateUser){
            return res.status(404).json('Usuario no existe')
        }

        res.status(201).json({message: `El usuario ${updateUser.nombre} ${updateUser.apellido} ha sido actualizado con éxito`})
    } catch (error) {
        res.status(500).json({message: 'No pudimos actualizar el usuario'})
    }
}

export const deleteUserByRut = async (req, res) => {
    try {
        const userRut = req.params.rut

        const removeUser = await User.findOneAndDelete({ rut: userRut})
 
        if (!removeUser){
           return res.status(404).json({message: 'El usuario no encontrado para eliminar'})
        }

        res.status(201).json({message: `El usuario ${removeUser.nombre} ${removeUser.apellido} ha sido eliminado con éxito`})

     } catch (error) {
         res.status(500).json({message: 'No pudimos eliminar el usuario'})
       
     }
}

export const getUserByRut = async(req, res) =>{
try {
    const {rut} = req.params

    const getUser = await User.findOne({rut: rut})
    
    if (!getUser){
        return res.status(404).json({message: 'El usuario no ha sido encontrado'})
     }
 
    res.status(200).json(getUser)

} catch (error) {
    res.status(404).json({message: 'Catch: No pudimos encontrar el usuario'})
}
}
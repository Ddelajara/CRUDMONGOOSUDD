import {Products} from '../models/Producto.model.js'

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Products.find();
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(404).json({message: 'No pudimos encontrar los productos'})
    }
}
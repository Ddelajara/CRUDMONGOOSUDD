import {Products} from '../models/Producto.model.js'

export const getAllProducts = async (req, res) => {
    try {
        console.log('entre a products')
        const allProducts = await Products.find();
        console.log(allProducts)
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(404).json({message: 'No pudimos encontrar los productos'})
    }
}
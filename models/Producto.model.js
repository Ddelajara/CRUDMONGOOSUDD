import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    Titulo: {type: String, required: true},
    Texto: {type: String, required: true},
    Precio: {type: String, required: true},
    Imagen: { type: String, required: true},
}, { versionKey: false})

export const Products = mongoose.model('products', ProductSchema)
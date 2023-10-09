import express from 'express'
const router = express.Router()

import {deleteUserByRut, getAllUsers, login, signUp, updateUser, getUserByRut} from '../controllers/user.controller.js'

import { authRequire } from '../middlewares/auth.middleware.js'
import { getAllProducts } from '../controllers/product.controller.js'

// router.get('/users', authRequire ,getAllUsers)
router.get('/users', getAllUsers)
router.post('/users', signUp)
router.post('/login', login)
router.get('/users/:rut', getUserByRut)
router.put('/users/:rut', updateUser)
router.delete('/users/:rut', deleteUserByRut)
router.get('/products', getAllProducts)

export default router


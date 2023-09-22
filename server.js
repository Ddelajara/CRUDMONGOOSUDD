import express from 'express';
import userRouter from './routes/user.routes.js'
import { db } from './config/db.config.js'

import dotenv from 'dotenv'
dotenv.config()


const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Middlewares de rutas
app.use('/api/v1', userRouter)


db()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})
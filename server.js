    import express from 'express';
    import cors from 'cors';
    import userRouter from './routes/user.routes.js'
    import { db } from './config/db.config.js'

    import dotenv from 'dotenv'
    import { corsOptions } from './middlewares/cors.middleware.js';
    dotenv.config()


    const app = express()

    //Middlewares
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    //middleware cors
    // app.options('*', cors(corsOptions));
    app.use(cors(corsOptions));
    //Middlewares de rutas
    app.use('/api/v1', userRouter)

    db()

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    })
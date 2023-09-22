import jwt from 'jsonwebtoken'

export const authRequire = (req, res, next) => {
try {
    const {authorization} = req.headers
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY)
    const actualTime = Math.floor(new Date()/1000)

    if (actualTime > decoded.exp){
        return res.status(401).json({message : "Token expirado"})
    }

    req.data = decoded.data
    
} catch (error) {
    return res.status(401).json(error)
}

next()

}
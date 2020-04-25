import { verify } from 'jsonwebtoken'
import config from '../../config'

export const verifyToken = (req, res, next) => {
    console.log(req.headers.authorization.split(' ')[1])

    try {
        const data = verify(token, config.JWT.PRIVATE_KEY)
        next()
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized.', message: 'Token verification failed' })
    }
}

export const verifyRole = (req, res, next) => {
    console.log(req.headers.authorization.split(' ')[1])

    try {
        const data = verify(token, config.JWT.PRIVATE_KEY)
        if (data.roleId === 2) { //admin 
            next()
        } else {
            res.status(401).send({ error: 'Unauthorized.', message: 'Access denied' })
        }
        
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized.', message: 'Token verification failed' })
    }
}

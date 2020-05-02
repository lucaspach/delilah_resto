import { verify } from 'jsonwebtoken'
import config from '../../config'

export const verifyToken = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        verify(token, config.JWT.PRIVATE_KEY)
        next()
        
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized.', message: 'Token verification failed' })
    }
}

export const verifyRole = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const data = verify(token, config.JWT.PRIVATE_KEY)

        if (data.role_id === 2) { //admin 
            next()
        } else {
            res.status(401).send({ error: 'Unauthorized.', message: 'Access denied' })
        }
        
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized.', message: 'Token verification failed' })
    }
}

export const getUserAuthenticated = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const data = verify(token, config.JWT.PRIVATE_KEY)
        
        return data.id
        
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized.', message: 'Token verification failed' })
    } finally {
        next()
    }
}

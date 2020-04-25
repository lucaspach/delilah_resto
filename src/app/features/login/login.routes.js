import {Router} from 'express'
import { LoginController } from './login.controller'
const router = Router()

router
    .post('/', async (req, res) => {
        const { user, pass } = req.body

        if (!user || !pass) return res.status(402).send( {error: 'Bad request.', message: 'You should send user and pass' })
        try {            
            const token = await LoginController.login(user, pass)

            if (token) {
                res.status(200).json({ message: 'Logged in successfully.', token })
            } else {
                res.status(401).send({ error: 'Unauthorized.', message: 'User or pass wrong' })
            }

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error })
        }
    })

export default router   
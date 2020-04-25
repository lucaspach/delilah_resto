import { Router } from 'express'
import {UsersController} from './users.controller'
const router = Router()

router
.get('/', async (req, res) => {

    try {
        const users = await UsersController.getAll()
        res.json(users)

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
    }
})
.get('/:id', async (req, res) => {

    const id = parseInt(req.params.id)

    if(!isNaN(id)) {

        try {
            const users = await UsersController.getById(id)
            res.json(users)

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    }
})
.post('/', async (req, res) => {

    try {            
        await UsersController.add(req.body)
        res.status(201).json({ message: 'User created successfully.' })

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
    }
})


export default router
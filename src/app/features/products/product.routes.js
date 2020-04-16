import { Router } from 'express'
import {ProductsController} from './products.controller'
const router = Router()

router
    .get('/', async (req, res) => {

        try {
            const products = await ProductsController.getAll()
            res.json(products)

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }

    })
    .get('/:id', async (req, res) => {

        try {
            const id = req.params.id
            const products = await ProductsController.getById(id)
            res.json(products)

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    })
    .post('/', async (req, res) => {

        try {            
            await ProductsController.add(req.body)
            res.status(201).json({ message: 'Product created successfully.' })

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    })
    .put('/:id', async (req, res) => {

        const id = parseInt(req.params.id)

        if(!isNaN(id)) {
            try {
                await ProductsController.updateById(id)
                res.status(200).json({ message: 'Product updated successfully.' })
            } catch (error) {
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
            }
        } else {
            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number' })
        }
    })
    .delete('/:id', async (req, res) => {
        // HACER DELETE Y PROBAR
        res.send('products delete')
    })

export default router
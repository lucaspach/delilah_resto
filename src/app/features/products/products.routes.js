import { Router } from 'express'
import {ProductsController} from './products.controller'
import { roleCheck } from '../../middlewares/auth.middleware'
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

        const id = parseInt(req.params.id)

        if(!isNaN(id)) {

            try {
                const products = await ProductsController.getById(id)
                res.json(products)

            } catch (error) {
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
            }
        }
    })
    // Verificamos que sea Admin    
    .use(roleCheck)

    .post('/', async (req, res)  => {

        try {            
            await ProductsController.add(req.body)
            res.status(201).json({ message: 'Product created successfully.' })

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    })
    .put('/:id', async (req, res)  => {

        const id = parseInt(req.params.id)

        if(!isNaN(id)) {
            try {
                let product = await ProductsController.getProductFromReq(req)
                product.id = id
                
                product = await ProductsController.updateProduct(product)

                if (product !== null) {
                    res.status(200).json( {product, message: 'Product updated successfully.' })
                    console.log('Entro')
                } else {
                    res.status(404).json({ error: 'Id not found.' })
                }
                
            } catch (error) {
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error })
            }
        } else {
            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number' })
        }
    })
    .delete('/:id', async (req, res)  => {
        
        const id = parseInt(req.params.id)

        if (!isNaN(id)) {
            try {
                const product = await ProductsController.getById(id)
                
                if (product !== null) {
                    await ProductsController.deleteById(id)
                    res.status(200).json({ message: 'Product deleted successfully.' })
                } else {
                    res.status(404).json({ error: 'Id not found.' })
                }
            } catch (error) {
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error })
            }
        } else {
            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number' })
        }

    })

export default router
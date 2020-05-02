import { Router } from 'express'
import { OrdersController } from './orders.controller'
import { verify } from 'jsonwebtoken'
import config from '../../../config'
import { verifyRole } from '../../middlewares/auth.middleware'
const router = Router()

router
    .get('/', verifyRole, async (req, res) => {

        try {
            const products = await OrdersController.getAll()
            res.json(products)

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    })
    .get('/:id', async (req, res) => { // aca verificar el usuario

        const id = parseInt(req.params.id)

        if(!isNaN(id)) {

            try {
                const products = await OrdersController.getById(id)
                res.json(products)

            } catch (error) {
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
            }
        }
    })
    .post('/', async (req, res)  => {

        try {
            // Obtengo el id del usuario loguiado de forma un poco sucia 
            const token = req.headers.authorization.split(' ')[1]
            const data = verify(token, config.JWT.PRIVATE_KEY)
            
            if (data) {
                const userId = data.id

                await OrdersController.add(userId, req.body)
                res.status(201).json({ message: 'Order created successfully.' })
                
            } else {
                res.status(404).json({ error: 'User not found.' })
            }
    
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    })
    .put('/:id', verifyRole, async (req, res)  => {

        const id = parseInt(req.params.id)

        if(!isNaN(id)) {
            try {
                let product = await OrdersController.getProductFromReq(req)
                product.id = id
                
                product = await OrdersController.updateProduct(product)

                if (product) {
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
    .delete('/:id', verifyRole, async (req, res)  => {
        
        const id = parseInt(req.params.id)

        if (!isNaN(id)) {
            try {
                const product = await OrdersController.getById(id)
                
                if (product !== null) {
                    await OrdersController.deleteById(id)
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
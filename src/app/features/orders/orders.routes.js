import { Router } from 'express'
import { OrdersController } from './orders.controller'
import { verify } from 'jsonwebtoken'
import config from '../../../config'
import { roleCheck } from '../../middlewares/auth.middleware'
import { Order } from './order.model'
const router = Router()

router
    .get('/', roleCheck, async (req, res) => {

        try {
            const orders = await OrdersController.getAll()
            //orders.products = await OrdersController.getAllProductsXOrders()
            // Añadimos los productos, según el ID
            const ordersXProducts = await OrdersController.getAllXProducts()
            orders.forEach(element => {
                ordersXProducts.forEach(elementP => {
                    if (element.id === elementP.orderId) {
                        element.products = elementP
                    }
                })
            })

            res.json(orders)

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    })
    .get('/:id', async (req, res) => { 

        const id = parseInt(req.params.id)
        // Obtengo el id del usuario loguiado de forma un poco sucia 
        const token = req.headers.authorization.split(' ')[1]
        const data = verify(token, config.JWT.PRIVATE_KEY)
        
        if(!isNaN(id)) {
            if(id === data.id) {
                try {
                    const orders = await OrdersController.getOneById()
                    //orders.products = await OrdersController.getAllProductsXOrders()
                    // Añadimos los productos, según el ID
                    const ordersXProducts = await OrdersController.getByIdOrdersXProducts()
                    orders.forEach(element => {
                        ordersXProducts.forEach(elementP => {
                            if (element.id === elementP.orderId) {
                                element.products = elementP
                            }
                        })
                    })
        
                    res.json(orders)

                } catch (error) {
                    res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
                }
            } else {
                res.status(402).send({ error: 'Unauthorized ID.', message: 'You can only see your orders.' })
            }
        } else {
            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number.' })
        }
    })
    .post('/',  async (req, res)  => {

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
    .put('/:id', roleCheck, async (req, res)  => {

        const id = parseInt(req.params.id)
        const stateId = parseInt(req.body.order_state_id)
        console.log(id + ' ' + stateId)

        if(!isNaN(id) && !isNaN(stateId)) {
            try {
                
                const order = await OrdersController.updateOneOrderState(id, stateId)

                if (order) {
                    res.status(200).json({ message: 'Order State updated successfully.' })
                } else {
                    res.status(404).json({ error: 'Id not found.' })
                }
                
            } catch (error) {
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error })
            }
        } else {
            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number.' })
        }
    })

export default router
import { Router } from 'express'
import { OrdersController } from './orders.controller'
import { verify } from 'jsonwebtoken'
import config from '../../../config'
import { roleCheck, getUserAuthenticated } from '../../middlewares/auth.middleware'

const router = Router()

router
    .get('/', async (req, res) => {

        try {
            // Obtengo el id del usuario loguiado de forma un poco sucia 
            const token = req.headers.authorization.split(' ')[1]
            const data = verify(token, config.JWT.PRIVATE_KEY)
            let orders
            let ordersXProducts
            // Validamos el rol del usuario logueado q sea Admin
            if (data.role_id === 2) {
                orders = await OrdersController.getAll()
                // Añadimos los productos, según el ID de la orden
                ordersXProducts = await OrdersController.getAllXProducts()
            } else {
                orders = await OrdersController.getAllUserDB(data.id)
                ordersXProducts = await OrdersController.getAllUserProductsXOrders(data.id)
            }
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
        
        if(!isNaN(id)) {
            try {
                const orders = await OrdersController.getOneById()

                // Añadimos los productos, según el ID
                const ordersXProducts = await OrdersController.getOneByIdOrdersXProducts()
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
            // res.status(402).send({ error: 'Unauthorized ID.', message: 'You can only see your orders.' })

        } else {
            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number.' })
        }
    })
    .post('/',  async (req, res)  => {

        try {
            const data = req.body

            if (data) {
                const order = await OrdersController.add(data)
                res.status(201).json( {order, message: 'Order created successfully.' })
                
           } else {
                res.status(404).json({ error: 'Information not found.' })
            } 
    
        } catch (error) {
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    })
    .put('/:id', roleCheck, async (req, res)  => {

        const id = parseInt(req.params.id)
        const stateId = parseInt(req.body.order_state_id)

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
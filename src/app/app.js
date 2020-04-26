import express from 'express'
import bodyParser from 'body-parser'
import productsRoutes from './features/products/products.routes'
import loginRoutes from './features/login/login.routes'
import loginUsers from './features/users/users.routes'
import { verifyToken } from './middlewares/auth.middleware'

const server = express()

server
    .use(bodyParser.json())
    .use('/users', loginUsers)
    .use('/login', loginRoutes)
    .use(verifyToken)
    .use('/products', productsRoutes)

export default server
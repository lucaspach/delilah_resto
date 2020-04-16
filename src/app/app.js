import express from 'express'
import bodyParser from 'body-parser'
import productsRoutes from './features/products/product.routes'
// import idValidator from './middlewares/id-validator.middleware'

const server = express()

server
    .use(bodyParser.json())
    .use('/products', productsRoutes)

export default server
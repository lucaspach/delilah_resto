import { OrdersService } from './orders.service';
import { Order } from './order.model';
import { OrderDetail } from './order_detail.model';

export class OrdersController {
    static async getAll() {
        return await OrdersService.getAllDB()
    }

    static async getAllXProducts() {
        return await OrdersService.getAllProductsXOrders()
    }

    // En caso que acceda un usuario y no un Admin al endpoint
    static async getAllUserDB(id) {
        return await OrdersService.getAllUserDB(id)
    }

    static async getAllUserProductsXOrders(id) {
        return await OrdersService.getAllUserProductsXOrders(id)
    }
    //

    static async getOneById(id) {
        return await OrdersService.getOneById(id)
    }

    static async getOneByIdOrdersXProducts(id) {
        return await OrdersService.getOneByIdProductsXOrders(id)
    }

    static async add({ userId, paymentId, products }) {
        // Creamos la fecha actual
        let creationDate = new Date()
        creationDate = creationDate.toLocaleDateString() + ' ' + creationDate.toLocaleTimeString()

        // Creamos la orden con estado 1 = "nuevo"
        const order = new Order(null, 1, paymentId, userId, creationDate)

        const rQueryOrder = await OrdersService.add(order)
        const orderId = rQueryOrder[0]["LAST_INSERT_ID()"]
        order.id = orderId
        
        // Obtenemos el total para el detalle de la orden
        let total = 0 
        products.forEach(element => {
           total += parseInt(element.quantity) * parseFloat(element.price)
        })
        
        if (total !== 0) {
            // Creamos el detalle de la orden
            const orderDetail = new OrderDetail(null, orderId, total)

            const rQueryOrderDetail = await OrdersService.addDetail(orderDetail)
            const orderDetailId = rQueryOrderDetail[0]["LAST_INSERT_ID()"]
            
            // Creamos el detalle de la orden x cada producto
            products.forEach(async element =>  {
                await OrdersService.storeDetailHasProduct(orderDetailId, element.id, element.quantity)
             })
            return order


        } else return new Error('Total Order must be more than 0')
        
    }

    static async updateOneOrderState(id, stateId) {
        return await OrdersService.updateOneOrderState(id, stateId)
    }

    static async deleteById(id) {
        const [orderId] = await OrdersService.getOneOrderDetailIdByOrderId(id)
        // Eliminamos el detalle y por último la orden
        await OrdersService.deleteDetailById(orderId.id)
        return await OrdersService.deleteById(id)
        
    }


}
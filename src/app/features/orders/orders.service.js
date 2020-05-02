import { Service } from '../../core/services/service'

export class OrdersService {

    static async getAllDB() {
        return await Service.getQuery('SELECT * FROM order')
    }

    static async getOneById(id) {
        return await Service.getQuery('SELECT * FROM order WHERE id = ?', [id])
    }

    static async store(order) {
        await Service.setQuery("INSERT INTO `delilah`.`order` (`id_state`, `id_payment`, `id_user`, `creation_datetime`)"
        + " VALUES (?, ?, ?, ?);", [
            order.stateId,
            order.paymentId,
            order.userId,
            order.creationDate
        ])
        // Obtenemos el id insertado
        return await Service.getQuery('SELECT LAST_INSERT_ID()')
    }

    static async storeDetail(orderDetail) {
        await Service.setQuery('INSERT INTO order_detail (id_order, total) VALUES (?, ?)', [
            orderDetail.orderId,
            orderDetail.total
        ])
        
        return await Service.getQuery('SELECT LAST_INSERT_ID()')
    }
} 
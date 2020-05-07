import { Service } from '../../core/services/service'

export class OrdersService {

    static async getAllDB() {
        return await Service.getQuery(`
        SELECT os.state, time(o.creation_datetime) creation_time, o.id, p.method, od.total,
        u.full_name, u.full_address
        FROM delilah.order o
        JOIN user u ON o.id_user = u.id
        JOIN order_state os ON o.id_state = os.id
        JOIN payment p ON o.id_payment = p.id
        JOIN order_detail od ON o.id = od.id_order
        ORDER BY creation_time desc`)
    }

    static async getAllProductsXOrders() {
        return await Service.getQuery(`
        SELECT DISTINCT o.id orderId, concat(odhp.product_quantity, 'x ', p.name) description, p.id productId, odhp.product_quantity quantity
        FROM delilah.order o 
        JOIN order_detail od ON o.id = od.id_order
        JOIN order_detail_has_product odhp ON odhp.order_detail_id = od.id
        JOIN product p ON p.id = odhp.product_id
        ORDER BY o.id`)
    }

    static async getAllUserDB(id) {
        return await Service.getQuery(`
        SELECT os.state, time(o.creation_datetime) creation_time, o.id, p.method, od.total,
        u.full_name, u.full_address
        FROM delilah.order o
        JOIN user u ON o.id_user = u.id
        JOIN order_state os ON o.id_state = os.id
        JOIN payment p ON o.id_payment = p.id
        JOIN order_detail od ON o.id = od.id_order
        WHERE o.id_user = ?
        ORDER BY creation_time desc`, [id])
    }

    static async getAllUserProductsXOrders(id) {
        return await Service.getQuery(`
        SELECT DISTINCT o.id orderId, concat(odhp.product_quantity, 'x ', p.name) description, p.id productId, odhp.product_quantity quantity
        FROM delilah.order o 
        JOIN order_detail od ON o.id = od.id_order
        JOIN order_detail_has_product odhp ON odhp.order_detail_id = od.id
        JOIN product p ON p.id = odhp.product_id
        WHERE o.id_user = ?
        ORDER BY o.id`, [id])
    }



    static async getOneById(id) {
        return await Service.getQuery(`
        SELECT os.state, time(o.creation_datetime) creation_time, o.id, p.method, od.total,
        u.full_name, u.full_address
        FROM delilah.order o
        JOIN user u ON o.id_user = u.id
        JOIN order_state os ON o.id_state = os.id
        JOIN payment p ON o.id_payment = p.id
        JOIN order_detail od ON o.id = od.id_order
        WHERE o.id = ?
        ORDER BY creation_time desc`, [id])
    }

    static async getOneByIdProductsXOrders(id) {
        return await Service.getQuery(`
        SELECT DISTINCT o.id orderId, concat(odhp.product_quantity, 'x ', p.name) description, p.id productId, odhp.product_quantity quantity
        FROM delilah.order o 
        JOIN order_detail od ON o.id = od.id_order
        JOIN order_detail_has_product odhp ON odhp.order_detail_id = od.id
        JOIN product p ON p.id = odhp.product_id
        WHERE o.id = ?
        ORDER BY o.id`, [id])
    }

    static async add(order) {
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

    static async addDetail(orderDetail) {
        await Service.setQuery('INSERT INTO order_detail (id_order, total) VALUES (?, ?)', [
            orderDetail.orderId,
            orderDetail.total
        ])
        
        return await Service.getQuery('SELECT LAST_INSERT_ID()')
    }

    static async storeDetailHasProduct(orderDetailId, productId, productQuantity) {
        await Service.setQuery('INSERT INTO order_detail_has_product (order_detail_id, product_id, product_quantity) VALUES (?, ?, ?)', [
            orderDetailId,
            productId,
            productQuantity
        ])
        
    }

    static async updateOneOrderState(id, stateId) {
        return await Service.setQuery('UPDATE delilah.order SET id_state = ? WHERE id = ?', [
            stateId,
            id
        ])
    }
} 
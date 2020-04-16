import { Service } from "../../core/services/service";

export class ProductsService {

    static async getAllDB() {
        return await Service.getQuery('SELECT * FROM product')
    }

    static async getOneById(id) {
        return await Service.getQuery('SELECT * FROM product WHERE id = ?', [id])
    }

    static async store(product) {
        return await Service.setQuery('INSERT INTO product VALUES (null, ?, ?, ?)', [
            product.name,
            product.price,
            product.descriptionImg
        ])
    }

}
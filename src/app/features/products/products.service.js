import { Service } from "../../core/services/service";

export class ProductsService {

    static async getAllDB() {
        return await Service.getQuery('SELECT * FROM product')
    }

    static async getOneById(id) {
        return await Service.getQuery('SELECT * FROM product WHERE id = ?', [id])
    }

    static async store(product) {
        return await Service.setQuery('INSERT INTO product (name, price, description_img) VALUES (?, ?, ?)', [
            product.name,
            product.price,
            product.descriptionImg
        ])
    }

    static async updateOneProduct(product) {
        return await Service.setQuery('UPDATE product SET id = ?, name = ?, price = ?, description_img = ? WHERE id = ?', [
            product.id,
            product.name,
            product.price,
            product.descriptionImg,
            product.id
        ])
    }

    static async deleteById(id) {
        return await Service.setQuery('DELETE product FROM product WHERE id = ?', [id])
    }

}
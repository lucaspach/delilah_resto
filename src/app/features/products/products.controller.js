import { ProductsService } from "./products.service.service";
import { Product } from "./product.model";

export class ProductsController {
    static async getAll() {
        return await ProductsService.getAllDB()
    }

    static async getById(id) {
        console.log('get one')
        return await ProductsService.getOneById(id)
    }

    static async add({ name, price, descriptionImg }) {
        const product = new Product(name, price, descriptionImg)
        return await ProductsService.store(product)
    }
}
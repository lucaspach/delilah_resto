import { ProductsService } from "./products.service";
import { Product } from "./product.model";

export class ProductsController {
    static async getAll() {
        return await ProductsService.getAllDB()
    }

    static async getById(id) {
        return await ProductsService.getOneById(id)
    }

    static async add({ name, price, descriptionImg }) {
        //console.log(name, price, descriptionImg)
        const product = new Product(null, name, price, descriptionImg)
        return await ProductsService.add(product)
    }

    static async getProductFromReq(req) {
        const product = {
            id: null,
            name: req.body.name,
            price: req.body.price,
            descriptionImg: req.body.descriptionImg
        }

        return product
    }

    static async updateProduct(product) {
        return await ProductsService.updateOneProduct(product)
    }

    static async deleteById(id) {
        return await ProductsService.deleteById(id)
    }


}
import { ProductsService } from "./products.service";
import { Product } from "./product.model";

export class ProductsController {
    static async getAll() {
        return await ProductsService.getAllDB()
    }

    static async getById(id) {
        //console.log('get one')
        return await ProductsService.getOneById(id)
    }

    static async add({ name, price, descriptionImg }) {
        //console.log(name, price, descriptionImg)
        const product = new Product(null, name, price, descriptionImg)
        return await ProductsService.store(product)
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

    static async getProductsFromReq(req) {
        const products = req.body.products
        console.log(products)
/*         let productsN
        products.forEach(element => {
            const product = {
                id: null,
                name: element.name,
                price: element.price,
                descriptionImg: element.descriptionImg
            }
            productsN.push(product)
        }); */
    /*      const product = {
            id: null,
            name: req.body.name,
            price: req.body.price,
            descriptionImg: req.body.descriptionImg
        }
 */
        return products
    }

    static async updateProduct(product) {
        return await ProductsService.updateOneProduct(product)
    }

    static async deleteById(id) {
        return await ProductsService.deleteById(id)
    }


}
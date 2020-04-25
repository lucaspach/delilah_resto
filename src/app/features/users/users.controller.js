import {UsersService} from './users.service'
import { User } from './user.model'

export class UsersController {
    static async getAll() {
        return await ProductsService.getAllDB()
    }

    static async getById(id) {
        return await ProductsService.getOneById(id)
    }

    static async add({ name, lastName, email, phoneNumber, fullAdress}) {
        //console.log(name, price, descriptionImg)
        const roleId = 1 // user por defecto
        const user = new User(null, name, lastName, email, phoneNumber, fullAdress, roleId)
        return await UsersService.store(user)
    }
}
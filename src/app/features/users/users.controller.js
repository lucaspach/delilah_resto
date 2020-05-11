import {UsersService} from './users.service'
import { User } from './user.model'

export class UsersController {
    /* static async getAll() {
        return await UsersService.getAllDB()
    }

    static async getById(id) {
        return await UsersService.getOneById(id)
    } */

    static async add({ fullName, username, password, email, phoneNumber, fullAddress }, roleId) {
        //console.log(name, price, descriptionImg)
        const user = new User(null, fullName, username, password, email, phoneNumber, fullAddress, roleId)
        return await UsersService.add(user)
    }
}
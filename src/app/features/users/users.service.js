import { Service } from '../../core/services/service'

export class UsersService {
    static async getAllDB() {
        return await Service.getQuery('SELECT * FROM user')
    }

    static async getOneById(id) {
        return await Service.getQuery('SELECT * FROM user WHERE id = ?', [id])
    }

    static async store(user) {
        return await Service.setQuery(
            + 'INSERT INTO user (name, lastName, email, phone_number, full_adress, role_id) VALUES (?, ?, ?, ?, ?, ?)', [
            user.name,
            user.lastName,
            user.email,
            user.phoneNumber,
            user.fullAdress,
            user.roleId
        ])
    }
}

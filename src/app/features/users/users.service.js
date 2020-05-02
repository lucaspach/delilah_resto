import { Service } from '../../core/services/service'

export class UsersService {
    static async getAllDB() {
        return await Service.getQuery('SELECT * FROM user')
    } //VER

    /* static async getOneById(id) {
        return await Service.getQuery('SELECT * FROM user WHERE id = ?', [id])
    } */

    static async store(user) {
        return await Service.setQuery(
            `INSERT INTO user (full_name, username, password, email, phone_number, full_address, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            user.fullName,
            user.username,
            user.password,
            user.email,
            user.phoneNumber,
            user.fullAddress,
            user.roleId
        ])
    }
}

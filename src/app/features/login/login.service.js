import { Service } from '../../core/services/service'

export class LoginService {

    static async login(user, pass) {
        return await Service.getQuery(`
            SELECT u.id, u.name, u.last_name, u.email, u.role_id
            FROM login l
            JOIN user u ON u.id = l.user_id
            WHERE l.username = ?
            AND l.password = ?`, [user, pass])
    }
}
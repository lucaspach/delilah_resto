import { Service } from '../../core/services/service'

export class LoginService {

    static async login(user, pass) {
        return await Service.getQuery(`
            SELECT u.id, u.full_name, u.email, u.role_id
            FROM login l
            JOIN user u ON u.id = l.user_id
            WHERE u.username = ?
            AND u.password = ?`, [user, pass])
    }
}
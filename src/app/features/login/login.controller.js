import { LoginService } from './login.service';
import { sign } from 'jsonwebtoken'
import config from '../../../config'

export class LoginController {
    static async login(user, pass) {
        const findUser = await LoginService.login(user, pass)

        if (findUser.length) {
            const token = sign(findUser[0], config.JWT.PRIVATE_KEY)
            return token
        } else {
            return null
        }

    }
}
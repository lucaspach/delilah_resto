export class Login {
    constructor(userId, user, pass, lastLoginDate, token) {
        this.userId = userId
        this.user = user
        this.pass = pass
        this.lastLoginDate = lastLoginDate
        this.token = token
    }
}
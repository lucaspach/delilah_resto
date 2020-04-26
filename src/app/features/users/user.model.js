export class User {
    constructor(id = null, fullName, username, password, email, phoneNumber, fullAddress, roleId) {
        this.id = id
        this.fullName = fullName
        this.username = username
        this.password = password
        this.email = email
        this.phoneNumber = phoneNumber
        this.fullAddress = fullAddress
        this.roleId = roleId
    }
}
export class User {
    constructor(id = null, name, lastName, email, phoneNumber, fullAddress, roleId) {
        this.id = id
        this.name = name
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.fullAddress = fullAddress
        this.roleId = roleId
    }
}
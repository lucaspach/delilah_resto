export class Order {
    constructor(id = null, stateId, paymentId, userId, creationDate) {
        this.id = id
        this.stateId = stateId
        this.paymentId = paymentId
        this.userId = userId
        this.creationDate = creationDate
    }
}
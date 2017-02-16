export class ClientError extends Error {
    constructor(m) {
        super(m)
        this.name = 'ClientError'
        this.message = m
    }
}

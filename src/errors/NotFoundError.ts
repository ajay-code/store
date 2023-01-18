export class NotFoundError extends Error implements HttpError {
    statusCode = 404
    constructor(message: string = 'Not Found') {
        super(message)
        this.name = 'NotFoundError'
    }
}

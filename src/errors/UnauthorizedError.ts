export class UnauthorizedError extends Error implements HttpError {
    statusCode = 401
    constructor(message: string = 'Unauthorized') {
        super(message)
    }
}

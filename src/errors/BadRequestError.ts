export class BadRequestError extends Error implements HttpError {
    statusCode = 400
    constructor(message: string = 'Bad Request') {
        super(message)
    }
}

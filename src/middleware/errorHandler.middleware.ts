import config from '#src/config/index.config.js'
import { Request, Response } from 'express'

function isHttpError(error: Error | HttpError): error is HttpError {
    return (error as HttpError).statusCode !== undefined
}

export function errorHandler(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: Function
) {
    const message = error.message ?? 'Something Went Wrong'
    const errorName = error.name ?? 'Error'
    let statusCode = 500

    if (isHttpError(error)) {
        statusCode = error.statusCode
    }

    if (config.NODE_ENV === 'production') {
        res.status(statusCode).json({
            error: {
                msg: message,
                name: errorName,
            },
        })
        return
    }

    console.log(error)
    res.status(statusCode).json({
        error: {
            msg: message,
            name: errorName,
        },
    })
}

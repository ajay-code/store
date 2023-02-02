import { Request, Response } from 'express'
import * as z from 'zod'
import httpStatus from 'http-status'

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
    let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR

    console.log(error)
    if (isHttpError(error)) {
        statusCode = error.statusCode
    }

    if (error instanceof z.ZodError) {
        res.status(httpStatus.BAD_REQUEST).json({ error: error.issues })
        return
    }

    // default handling of unknown error
    if (process.env.NODE_ENV === 'production') {
        res.status(statusCode).json({
            error: { msg: message, name: errorName },
        })
        return
    }
    res.status(statusCode).json({
        error: {
            msg: message,
        },
    })
}

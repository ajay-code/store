import config from '#src/config/index.js'
import { Request, Response } from 'express'
import * as z from 'zod'

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

    console.log(error)
    if (isHttpError(error)) {
        statusCode = error.statusCode
    }

    if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues })
        return
    }

    // default handling of unknown error
    if (process.env.NODE_ENV === 'production') {
        res.status(500).json({
            error: { msg: 'something went wrong', name: 'Error' },
        })
        return
    }
    res.status(statusCode).json({
        error: {
            msg: message,
            name: errorName,
        },
    })
}

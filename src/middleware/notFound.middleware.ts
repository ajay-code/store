import { NotFoundError } from '#src/errors/NotFoundError.js'
import { Request, Response } from 'express'

export function notFound(req: Request, res: Response, next: Function) {
    next(new NotFoundError('Not Page Found'))
}

import { UnauthorizedError } from '#src/errors/UnauthorizedError.js'
import db from '#src/lib/knex/db.js'
import { Store } from '#src/models/index.js'
import JWTService, { JWTPayload } from '#src/services/jwt.service.js'
import { Request, Response } from 'express'
import httpStatus from 'http-status'

declare global {
    namespace Express {
        export interface Request {
            payload: JWTPayload
            user: User
        }
    }
}

export async function isAuthenticated(
    req: Request,
    res: Response,
    next: Function
) {
    const token = req.cookies.token
    if (!token) {
        res.status(httpStatus.UNAUTHORIZED).json({ error: 'no token provided' })
        return
    }

    const payload = JWTService.verifyToken(token)
    if (!payload) {
        throw new UnauthorizedError('invalid token')
    }
    req.payload = payload as JWTPayload

    next()
}

export async function isAuthorOfStore(
    req: Request,
    res: Response,
    next: Function
) {
    const author = req.payload.userId
    const { id: store_id } = req.params
    const store = await db
        .table<Store>('stores')
        .where('id', parseInt(store_id))
        .andWhere('author', author)
        .first()
    if (!store) {
        throw new UnauthorizedError()
    }
    next()
}

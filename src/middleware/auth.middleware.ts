import JWTService, { JWTPayload } from '#src/services/jwt.service.js'
import { Request, Response } from 'express'
// import User from '#src/models/user.model.js'

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
        res.status(401).json({ error: 'no token provided' })
        return
    }

    const payload = JWTService.verifyToken(token)

    if (!payload) {
        res.status(401).json({ error: 'invalid token' })
    }

    req.payload = payload as JWTPayload

    next()
}

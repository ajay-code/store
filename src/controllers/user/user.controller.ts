import db from '#src/lib/knex/db.js'
import { User } from '#src/models/index.js'
import { AuthService } from '#src/services/auth.service.js'
import { jwtUtils, userUtils } from '#src/utils/index.js'
import { registerSchema } from '#src/validators/index.js'
import { Request, Response } from 'express'
import { z } from 'zod'

const authService = new AuthService()

export const register = async (req: Request, res: Response) => {
    // validate data
    const userData: z.infer<typeof registerSchema> = registerSchema.parse(
        req.body
    )

    // save user in DB
    await authService.register(userData, db.table<User>('users'))

    // login the user
    const user = (await db
        .table<User>('users')
        .where('email', userData.email)
        .first()) as User
    const token = jwtUtils.makeJwtTokenForUser(user)
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600 * 24 * 30,
        path: '/',
    })

    res.json(userUtils.getUserInfo(user))
}

export const update = (req: Request, res: Response) => {
    res.send('update account')
}

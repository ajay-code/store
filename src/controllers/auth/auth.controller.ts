import config from '#src/config/index.js'
import db from '#src/lib/knex/db.js'
import { User } from '#src/models/index.js'
import forgotPasswordService from '#src/services/forgotPassword.service.js'
import { AuthService, UserService } from '#src/services/index.js'
import { userUtils } from '#src/utils/index.js'
import { makeJwtTokenForUser } from '../helpers/index.js'
import { loginSchema } from '#src/validators/auth.validators.js'
import { Request, Response } from 'express'
import { z } from 'zod'

const authService = new AuthService()
const userService = new UserService()

export const login = async (req: Request, res: Response) => {
    // validation
    const credentials: z.infer<typeof loginSchema> = loginSchema.parse(req.body)

    // login and token generation
    const User = db.table<User>('users')
    const user = await authService.login(credentials, User)
    const token = makeJwtTokenForUser(user)
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600 * 24 * 30,
        path: '/',
    })

    res.json(userUtils.getUserInfo(user))
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token')
    res.send('logged out')
}

const forgotSchema = z.object({
    email: z.string().email(),
})

export const forgot = async (req: Request, res: Response) => {
    const { email }: z.infer<typeof forgotSchema> = forgotSchema.parse(req.body)

    const user = await userService.getUserByEmail(
        email,
        db.table<User>('users')
    )
    if (!user) {
        throw Error('No account with that Email')
    }

    const resetPasswordToken = await userService.generateResetPasswordToken(
        user,
        db.table<User>('users')
    )
    const resetLink = config.BASE_URL + '/account/reset/' + resetPasswordToken
    await forgotPasswordService.sendForgotPasswordEmail({
        to: user.email,
        resetLink,
    })
    res.json({ msg: 'email sent' })
}

export const reset = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        throw Error('Password do not match')
    }

    const user = await userService.getUserByResetPasswordToken(
        token,
        db.table<User>('users')
    )

    if (!user?.reset_password_expires) {
        throw Error('Token Expired')
    }
    if (new Date() >= new Date(user.reset_password_expires)) {
        throw Error('Token Expired')
    }

    await userService.resetPassword(user, password, db.table<User>('users'))
    res.json({ msg: 'password changed' })
}

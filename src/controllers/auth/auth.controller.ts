import { z } from 'zod'
import { Request, Response } from 'express'
import { randomBytes } from 'node:crypto'
import getUserModel, { User } from '#src/models/user.model.js'
import authService from '#src/services/auth.service.js'
import { registerSchema, loginSchema } from '#src/validators/auth.validators.js'
import jwtService, { JWTPayload } from '#src/services/jwt.service.js'
import { getUserInfo } from '#src/utils/index.js'
import forgotPasswordService from '#src/services/forgotPassword.service.js'
import config from '#src/config/index.config.js'

function makeJwtTokenForUser(user: User) {
    const jwtPayload: JWTPayload = {
        email: user.email,
        userId: user.id,
    }
    return jwtService.generateToken(jwtPayload)
}

export const login = async (req: Request, res: Response) => {
    // validation
    let credentials: z.infer<typeof loginSchema>
    try {
        credentials = loginSchema.parse(req.body)
    } catch (error: any) {
        res.status(401).json({ error: error.message })
        return
    }

    // login and token generation
    const User = getUserModel()
    const user = await authService.loginUser(credentials, User)
    const token = makeJwtTokenForUser(user)

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600 * 24 * 30,
        path: '/',
    })

    res.json(getUserInfo(user))
}

export const register = async (req: Request, res: Response) => {
    // validate data
    let userData: z.infer<typeof registerSchema>
    try {
        userData = registerSchema.parse(req.body)
    } catch (error: any) {
        console.log(error.message)
        res.json({ errors: error.message })
        return
    }

    // save user in DB
    let User = getUserModel()
    await authService.registerUser(userData, User)

    // login the user
    User = getUserModel()
    const user = (await User.where('email', userData.email).first()) as User
    const token = makeJwtTokenForUser(user)
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600 * 24 * 30,
        path: '/',
    })

    res.json(getUserInfo(user))
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token')
    res.send('logged out')
}

export const forgot = async (req: Request, res: Response) => {
    const { email } = req.body
    let User = getUserModel()
    const user = await User.where('email', email).first()
    if (!user) {
        throw Error('No account with that Email')
    }

    const resetPasswordToken = authService.generateResetPasswordToken(user)
    const resetLink = config.BASE_URL + '/reset/' + resetPasswordToken
    await forgotPasswordService.sendForgotPasswordEmail({
        to: user.email,
        resetLink,
    })

    res.json({ msg: 'eamil sent', resetPasswordToken })
}

export const reset = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        throw Error('Password do not match')
    }

    const User = getUserModel()
    const user = await User.where('reset_password_token', token).first()
    if (new Date() < new Date(user?.reset_password_expires ?? -10000)) {
        console.log(
            new Date(),
            new Date(user?.reset_password_expires ?? -10000)
        )
        throw Error('Token Expired')
    }
    res.json({ params: req.params, body: req.body })
}

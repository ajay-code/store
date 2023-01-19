import { z } from 'zod'
import { Request, Response } from 'express'
import { User, getUserModel } from '#src/models/index.js'
import { AuthService, UserService } from '#src/services/index.js'
import { registerSchema, loginSchema } from '#src/validators/auth.validators.js'
import jwtService, { JWTPayload } from '#src/services/jwt.service.js'
import { getUserInfo } from '#src/utils/index.js'
import forgotPasswordService from '#src/services/forgotPassword.service.js'
import config from '#src/config/index.js'

const authService = new AuthService()
const userService = new UserService()

function makeJwtTokenForUser(user: User) {
    const jwtPayload: JWTPayload = {
        email: user.email,
        userId: user.id,
    }
    return jwtService.generateToken(jwtPayload)
}

export const login = async (req: Request, res: Response) => {
    // validation
    const credentials: z.infer<typeof loginSchema> = loginSchema.parse(req.body)

    // login and token generation
    const User = getUserModel()
    const user = await authService.login(credentials, User)
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
    const userData: z.infer<typeof registerSchema> = registerSchema.parse(
        req.body
    )

    // save user in DB
    let User = getUserModel()
    await authService.register(userData, User)

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

const forgotSchema = z.object({
    email: z.string().email(),
})
export const forgot = async (req: Request, res: Response) => {
    const { email }: z.infer<typeof forgotSchema> = forgotSchema.parse(req.body)

    const user = await userService.getUserByEmail(email, getUserModel())
    if (!user) {
        throw Error('No account with that Email')
    }

    const resetPasswordToken = await userService.generateResetPasswordToken(
        user,
        getUserModel()
    )
    const resetLink = config.BASE_URL + '/account/reset/' + resetPasswordToken
    const result = await forgotPasswordService.sendForgotPasswordEmail({
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
        getUserModel()
    )

    if (!user?.reset_password_expires) {
        throw Error('Token Expired')
    }
    if (new Date() >= new Date(user.reset_password_expires)) {
        throw Error('Token Expired')
    }

    await userService.resetPassword(user, password, getUserModel())
    res.json({ msg: 'password changed' })
}

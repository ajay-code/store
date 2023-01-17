import { z } from 'zod'
import { Request, Response } from 'express'
import getUserModel from '#src/models/user.model.js'
import authService from '#src/services/auth.service.js'
import { registerSchema, loginSchema } from '#src/validators/auth.validators.js'
import jwtService, { JWTPayload } from '#src/services/jwt.service.js'

export const login = async (req: Request, res: Response) => {
    let credentials: z.infer<typeof loginSchema>

    try {
        credentials = loginSchema.parse(req.body)
    } catch (error: any) {
        res.status(401).json({ error: error.message })
        return
    }

    const User = getUserModel()
    const user = await authService.loginUser(credentials, User)
    const jwtPayload: JWTPayload = {
        email: user.email,
        userId: user.id,
    }
    const token = jwtService.generateToken(jwtPayload)

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600 * 24 * 30,
        path: '/',
    })

    res.json({
        user,
    })
}

export const register = async (req: Request, res: Response) => {
    let userData: z.infer<typeof registerSchema>

    // validate data
    try {
        userData = registerSchema.parse(req.body)
    } catch (error: any) {
        console.log(error.message)
        res.json({ errors: error.message })
        return
    }

    const User = getUserModel()
    // save user in DB
    await authService.registerUser(userData, User)

    res.json({ name: userData.name, email: userData.email })
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token')
    res.send('logged out')
}

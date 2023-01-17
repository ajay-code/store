import getUserModel, { User } from '#src/models/user.model.js'
import { loginSchema, registerSchema } from '#src/validators/auth.validators.js'
import { Knex } from 'knex'
import { z } from 'zod'
import { randomBytes } from 'node:crypto'
import passwordService from './password.service.js'

class AuthService {
    public async registerUser(
        user: z.infer<typeof registerSchema>,
        User: Knex.QueryBuilder<User>
    ) {
        let { email, name, password } = user
        const hashedPassword = await passwordService.hash(password)
        password = hashedPassword

        return User.insert({
            email,
            name,
            password,
        })
    }

    public async loginUser(
        credentials: z.infer<typeof loginSchema>,
        User: Knex.QueryBuilder<User>
    ): Promise<User> {
        const user: User = await User.where('email', credentials.email).first()
        if (!user) {
            throw Error('user not found')
        }

        const passwordValid = await passwordService.compare(
            credentials.password,
            user.password
        )
        if (!passwordValid) {
            throw Error('password not valid')
        }

        return user
    }

    async generateResetPasswordToken(user: User) {
        const User = getUserModel()
        const resetPasswordToken = randomBytes(32).toString('hex')
        const resetPasswordExpires = Date.now() + 3600000

        await User.update({
            reset_password_expires: new Date(resetPasswordExpires),
            reset_password_token: resetPasswordToken,
        }).where('id', user.id)

        return resetPasswordToken
    }
}

export default new AuthService()

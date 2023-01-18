import { UnauthorizedError } from '#src/errors/index.js'
import { User } from '#src/models/index.js'
import { loginSchema, registerSchema } from '#src/validators/index.js'
import { Knex } from 'knex'
import { z } from 'zod'
import { PasswordService } from './password.service.js'

const passwordService = new PasswordService()

export class AuthService {
    public async register(
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

    public async login(
        credentials: z.infer<typeof loginSchema>,
        User: Knex.QueryBuilder<User>
    ): Promise<User> {
        const user: User = await User.where('email', credentials.email).first()
        if (!user) {
            throw new UnauthorizedError('user not found')
        }

        const passwordValid = await passwordService.compare(
            credentials.password,
            user.password
        )
        if (!passwordValid) {
            throw new UnauthorizedError('password not valid')
        }

        return user
    }
}

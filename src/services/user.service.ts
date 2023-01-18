import { User } from '#src/models/index.js'
import { Knex } from 'knex'
import { randomBytes } from 'node:crypto'
import { PasswordService } from './password.service.js'

const passwordService = new PasswordService()

export class UserService {
    async generateResetPasswordToken(
        user: User,
        User: Knex.QueryBuilder<User>
    ) {
        const resetPasswordToken = randomBytes(32).toString('hex')
        const resetPasswordExpires = Date.now() + 3600000

        await User.update({
            reset_password_expires: new Date(resetPasswordExpires),
            reset_password_token: resetPasswordToken,
        }).where('id', user.id)

        return resetPasswordToken
    }

    async resetPassword(
        user: User,
        newPassword: string,
        User: Knex.QueryBuilder<User>
    ) {
        const hashedPassword = await passwordService.hash(newPassword)
        return User.update('password', hashedPassword).where('id', user.id)
    }

    getUserByEmail(email: string, User: Knex.QueryBuilder<User>) {
        return User.where('email', email).first()
    }

    getUserByResetPasswordToken(token: string, User: Knex.QueryBuilder<User>) {
        return User.where('reset_password_token', token).first()
    }
}

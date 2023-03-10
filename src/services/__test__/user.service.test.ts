import db from '#src/lib/knex/db.js'
import * as z from 'zod'
import { registerSchema } from '#src/validators/auth.validators.js'
import { UserService } from '../user.service.js'
import { AuthService } from '../auth.service.js'
import { User } from '#src/models/user.model.js'

const userService = new UserService()
const authService = new AuthService()

const validUser: z.infer<typeof registerSchema> = {
    name: 'user',
    email: 'user@email.com',
    password: 'secret',
    confirmPassword: 'secret',
}
let resetPasswordToken: string

beforeAll(async () => {
    await db.raw('BEGIN')
    await authService.register(validUser, db.table<User>('users'))
    const user = await userService.getUserByEmail(
        validUser.email,
        db.table<User>('users')
    )
    resetPasswordToken = await userService.generateResetPasswordToken(
        user,
        db.table<User>('users')
    )
})

afterAll(async () => {
    await db.raw('ROLLBACK')
    db.destroy()
})

describe('userService', () => {
    it('it should get user by email successfully', async () => {
        const user = await userService.getUserByEmail(
            validUser.email,
            db.table<User>('users')
        )
        expect(user).toEqual(expect.objectContaining(user))
    })

    it('it should get user by reset_password_token', async () => {
        const user = await userService.getUserByResetPasswordToken(
            resetPasswordToken,
            db.table<User>('users')
        )
        expect(user).toEqual(expect.objectContaining(user))
    })

    it('it should generate user password_reset_token', async () => {
        const user = await userService.getUserByEmail(
            validUser.email,
            db.table<User>('users')
        )
        resetPasswordToken = await userService.generateResetPasswordToken(
            user,
            db.table<User>('users')
        )

        expect(typeof resetPasswordToken).toBe('string')
    })
})

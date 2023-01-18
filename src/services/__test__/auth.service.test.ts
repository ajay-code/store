import { AuthService } from '../auth.service.js'
import * as zod from 'zod'
import { registerSchema } from '#src/validators/auth.validators.js'
import db from '#src/lib/knex/db.js'
import { getUserModel } from '#src/models/index.js'

const authService = new AuthService()

beforeAll(async () => {
    await db.raw('BEGIN')
})
afterAll(async () => {
    await db.raw('ROLLBACK')
    db.destroy()
})

describe('authService', () => {
    const validUser: zod.infer<typeof registerSchema> = {
        name: 'user',
        email: 'user@email.com',
        password: 'secret',
        confirmPassword: 'secret',
    }

    it('should created user successfully', async () => {
        const UserModel = getUserModel()
        const result = await authService.register(validUser, UserModel)
        expect(result[0]).toBeGreaterThan(0)
    })

    it('should login user successfully', async () => {
        const UserModel = getUserModel()
        const credentials = {
            email: validUser.email,
            password: validUser.password,
        }
        const result = await authService.login(credentials, UserModel)

        expect(result).toEqual(
            expect.objectContaining({
                email: validUser.email,
                name: validUser.name,
            })
        )
    })

    it('should reject login with error user not found', async () => {
        const UserModel = getUserModel()
        const credentials = {
            email: 'invalid@email.com',
            password: 'password',
        }

        await expect(authService.login(credentials, UserModel)).rejects.toThrow(
            'user not found'
        )
    })

    it('should reject login with error user not found', async () => {
        const UserModel = getUserModel()
        const credentials = {
            email: validUser.email,
            password: 'invalid password',
        }

        await expect(authService.login(credentials, UserModel)).rejects.toThrow(
            'password not valid'
        )
    })
})

import passwordService from '../password.service.js'

describe('passwordService', () => {
    const password = 'secret'
    let hashedPassword: string

    beforeAll(async () => {
        hashedPassword = await passwordService.hash(password)
    })

    it('it should return true for correct password', async () => {
        const result = await passwordService.compare(password, hashedPassword)
        expect(result).toBe(true)
    })

    it('it should return true for correct password', async () => {
        const result = await passwordService.compare(
            'invalid password',
            hashedPassword
        )
        expect(result).toBe(false)
    })
})

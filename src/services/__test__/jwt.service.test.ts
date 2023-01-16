import jwtService from '../jwt.service.js'

describe('jwtService', () => {
    const user = { userId: 1, email: 'user@email.com' }

    it('should resolve to true and return valid userId and email for generated token', async () => {
        const fakeToken = jwtService.generateToken(user)
        const payload = jwtService.verifyToken(fakeToken)
        expect(payload).toEqual(expect.objectContaining(user))
    })

    it('should resolve to false for expired token', async () => {
        const fakeToken = jwtService.generateToken(user, { expiresIn: 0 })
        const payload = jwtService.verifyToken(fakeToken)
        expect(payload).toBe(false)
    })

    it('should resolve to false for invalid token', async () => {
        const fakeToken = 'invalid token'
        const payload = jwtService.verifyToken(fakeToken)
        expect(payload).toBe(false)
    })
})

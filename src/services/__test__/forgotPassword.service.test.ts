import forgotPasswordService from '../forgotPassword.service.js'

const mailOptions = {
    to: 'ajay@emil.com',
    resetLink: 'http://google.com',
}
describe('forgotPasswordService', () => {
    it('it should send email with mailOptions Successfully', async () => {
        const result = await forgotPasswordService.sendForgotPasswordEmail(
            mailOptions
        )
        expect(result).toEqual(
            expect.objectContaining({ accepted: [mailOptions.to] })
        )
    })
})

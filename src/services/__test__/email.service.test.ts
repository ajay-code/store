import { jest } from '@jest/globals'
import emailService from '../email.service.js'

// const sendMailMock = jest.fn(() => Promise.resolve('email sent'))
// jest.mock('nodemailer', () => ({
//     createTransport: jest.fn().mockReturnThis(),
//     sendMail: sendMailMock,
// }))

const mailOptions = {
    to: 'ajay@emil.com',
    subject: 'string',
    html: 'string',
    text: 'string',
}
describe('emailService', () => {
    it('it should send email with mailOptions Successfully', async () => {
        const result = await emailService.sendEmail(mailOptions)
        expect(result).toEqual(
            expect.objectContaining({ accepted: [mailOptions.to] })
        )
    })
})

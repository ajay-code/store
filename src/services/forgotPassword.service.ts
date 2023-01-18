import emailService from './email.service.js'

export class ForgotPassword {
    constructor() {}

    sendForgotPasswordEmail(opt: { to: string; resetLink: string }) {
        let subject = 'Password Reset'
        let text = `click the following link to reset your password. <a href="${opt.resetLink}">Password Reset</a>`
        let html = `
            <p>${text}</p>
        `
        const mailOptions = {
            to: opt.to,
            subject,
            html,
            text,
        }
        return emailService.sendEmail(mailOptions)
    }
}

const forgotPasswordService = new ForgotPassword()

export default forgotPasswordService

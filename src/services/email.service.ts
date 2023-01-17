import config from '#src/config/index.config.js'
import nodemailer, { Transporter } from 'nodemailer'

export class EmailService {
    private from = 'Store Admin <noreply@store.com>'
    private transport: Transporter

    constructor() {
        this.transport = nodemailer.createTransport({
            host: config.EMAIL.host,
            port: config.EMAIL.port,
            auth: {
                user: config.EMAIL.user,
                pass: config.EMAIL.password,
            },
        })
    }

    sendEmail(opt: {
        to: string
        subject: string
        html: string
        text: string
    }) {
        return this.transport.sendMail({
            from: this.from,
            ...opt,
        })
    }
}

export default new EmailService()

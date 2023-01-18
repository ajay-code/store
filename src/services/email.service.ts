import config from '#src/config/index.js'
import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js'

export class EmailService {
    private from = 'Store Admin <noreply@store.com>'
    private transport: Transporter

    constructor(mailConfig: SMTPTransport.Options, from?: string) {
        this.transport = nodemailer.createTransport(mailConfig)
        if (from) {
            this.from = from
        }
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

const mailConfig = {
    host: config.EMAIL.host,
    port: config.EMAIL.port,
    auth: {
        user: config.EMAIL.user,
        pass: config.EMAIL.password,
    },
}

export default new EmailService(mailConfig)

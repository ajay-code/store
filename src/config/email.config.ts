const EMAIL = {
    host: process.env.MAIL_HOST ?? '',
    port: parseInt(process.env.MIAL_PORT ?? '') ?? undefined,
    user: process.env.MAIL_USER ?? '',
    password: process.env.MAIL_PASSWORD ?? '',
}

export default EMAIL

import db from '#src/lib/knex/db.js'

export interface User {
    id: number
    email: string
    username: string
    password: string
    reset_password_token?: string
    reset_password_expires?: string
    created_at: Date
    updated_at: Date
}

export default function getUserModel() {
    return db<User>('users')
}

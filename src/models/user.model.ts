import db from '#src/lib/knex/db.js'

export interface User {
    id: number
    email: string
    name: string
    password: string
    reset_password_token?: string
    reset_password_expires?: Date
    created_at: Date
    updated_at: Date
}

export interface UserInfo
    extends Omit<
        User,
        'password' | 'reset_password_token' | 'reset_password_expires'
    > {}

export default function getUserModel() {
    return db<User>('users')
}

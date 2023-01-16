import { Knex } from 'knex'

export interface User {
    id: number
    email: string
    fullname: string
    username: string
    password: string
    created_at: Date
    updated_at: Date
}

export const up = (knex: Knex): Promise<void> => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('email', 90).notNullable().unique()
        table.string('name', 100).notNullable()
        table.string('password').notNullable()
        table.string('reset_password_token').nullable()
        table.timestamp('reset_password_expires').nullable()
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    })
}

export const down = (knex: Knex): Promise<void> => {
    return knex.schema.dropTable('users')
}

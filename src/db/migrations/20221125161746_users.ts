import { Knex } from 'knex'

export const up = (knex: Knex): Promise<void> => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('email', 90).notNullable().unique()
        table.string('name', 100).notNullable()
        table.string('password').notNullable()
        table.string('reset_password_token').nullable()
        table.timestamp('reset_password_expires').nullable()
        table.timestamps()
    })
}

export const down = (knex: Knex): Promise<void> => {
    return knex.schema.dropTableIfExists('users')
}

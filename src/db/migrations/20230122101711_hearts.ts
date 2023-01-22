import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('hearts', (table) => {
        table.integer('user_id').unsigned().notNullable().references('users.id')
        table
            .integer('store_id')
            .unsigned()
            .notNullable()
            .references('stores.id')

        table.primary(['user_id', 'store_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('hearts')
}

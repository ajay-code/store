import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reviews', (table) => {
        table.increments('id')
        table.integer('author').references('users.id')
        table.integer('store').references('stores.id')
        table.text('text').notNullable()
        table.integer('rating').checkBetween([1, 5])
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('reviews')
}

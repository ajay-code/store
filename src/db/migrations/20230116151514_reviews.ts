import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reviews', (table) => {
        table.increments('id')
        table.integer('author').unsigned().notNullable().references('users.id')
        table.integer('store').unsigned().notNullable().references('stores.id')
        table.text('text').notNullable()
        table.integer('rating').checkBetween([1, 5])
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('reviews')
}

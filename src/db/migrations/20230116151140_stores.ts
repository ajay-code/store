import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('stores', (table) => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('slug').nullable()
        table.string('location_type', 10).defaultTo('Point')
        table.point('location_coordinates').notNullable()
        table.string('location_address').notNullable()
        table.string('photo').nullable()
        table.integer('author').unsigned().notNullable().references('users.id')
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('stores')
}

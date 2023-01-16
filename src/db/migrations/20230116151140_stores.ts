import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('stores', (table) => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('slug').nullable()
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        // table. location
        table.string('photo').nullable()
        table.integer('author').references('users.id').notNullable()

        console.error('location implementation not completed')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('stores')
}

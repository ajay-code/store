import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('stores_tags', (table) => {
        table.integer('store_id').references('stores.id').notNullable()
        table.integer('tag_id').references('tags').notNullable()

        table.primary(['store_id', 'tag_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('stores_tags')
}

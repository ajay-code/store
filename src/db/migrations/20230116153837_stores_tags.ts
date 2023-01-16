import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('stores_tags', (table) => {
        table
            .integer('store_id')
            .unsigned()
            .notNullable()
            .references('stores.id')
        table.integer('tag_id').unsigned().notNullable().references('tags.id')

        table.primary(['store_id', 'tag_id'])
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('stores_tags')
}

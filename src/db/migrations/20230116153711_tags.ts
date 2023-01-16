import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tags', (table) => {
        table.increments('id')
        table.string('tag', 50)
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('tags')
}

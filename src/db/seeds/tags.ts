import { Knex } from 'knex'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex: Knex) {
    const tags = [
        'Wifi',
        'Open Late',
        'Family Friendly',
        'Vegetarian',
        'Licensed',
    ].map((tag) => ({ tag }))

    // Deletes ALL existing entries
    await knex('tags').del()
    await knex('tags').insert(tags)
}

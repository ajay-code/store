import { DBTableList } from '#src/lib/knex/db.js'
import tags from '../data/tags.json' assert { type: 'json' }
import { Knex } from 'knex'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex: Knex) {
    await knex(DBTableList.TAGS_TABLE).del()

    const tagList = tags.map((tag) => ({ tag }))

    await knex(DBTableList.TAGS_TABLE).insert(tagList)
}

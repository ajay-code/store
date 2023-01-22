import { DBTableList } from '#src/lib/knex/db.js'
import { StoresTags } from '#src/models/stores_tags.model.js'
import { Knex } from 'knex'
import stores from '../data/stores.json' assert { type: 'json' }
import tags from '../data/tags.json' assert { type: 'json' }

export const seed = async function (knex: Knex) {
    await knex.table(DBTableList.STORES_TAGS_TABLE).del()

    const storesTagsList = []
    for (let store of stores) {
        for (let tag of store.tags) {
            let tag_id = tags.indexOf(tag) + 1
            storesTagsList.push({ store_id: store.id, tag_id })
        }
    }

    await knex.table(DBTableList.STORES_TAGS_TABLE).insert(storesTagsList)
}

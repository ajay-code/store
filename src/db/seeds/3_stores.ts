import { DBTableList } from '#src/lib/knex/db.js'
import { Knex } from 'knex'
import stores from '../data/stores.json' assert { type: 'json' }
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex: Knex) {
    await knex.table(DBTableList.STORE_TABLE).del()

    const storeList = []
    for (let store of stores) {
        storeList.push({
            id: store.id,
            name: store.name,
            slug: store.slug,
            description: store.description,
            author: store.author,
            photo: store.photo,
            location_coordinates: knex.raw('POINT(?, ?)', [
                store.location.coordinates[1],
                store.location.coordinates[0],
            ]),
            location_address: store.location.address,
        })
    }

    await knex(DBTableList.STORE_TABLE).insert(storeList)
}

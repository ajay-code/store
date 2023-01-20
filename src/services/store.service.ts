import db from '#src/lib/knex/db.js'
import { Store } from '#src/models/store.model.js'
import { StoresTags } from '#src/models/stores_tags.model.js'
import { Knex } from 'knex'

export class StoreService {
    async addStore(store: any, Store: Knex.QueryBuilder<Store>) {
        const [store_id] = await Store.insert({
            ...store,
            location_coordinates: db.raw(
                `POINT (${store.location_coordinates[0]}, ${store.location_coordinates[1]})`
            ),
        })

        return store_id
    }

    async updateStore(
        store_id: number,
        store: any,
        Store: Knex.QueryBuilder<Store>
    ) {
        return Store.update({
            ...store,
            location_coordinates: db.raw(
                `POINT (${store.location_coordinates[0]}, ${store.location_coordinates[1]})`
            ),
        }).where('id', store_id)
    }

    async addTagsToStore(
        store_id: number,
        tags: number[],
        StoresTags: Knex.QueryBuilder<StoresTags>
    ) {
        const stores_tags = tags.map((tag_id) => ({
            store_id,
            tag_id,
        }))
        return StoresTags.insert(stores_tags)
    }

    async removeTagsFromStore(
        store_id: number,
        StoresTags: Knex.QueryBuilder<StoresTags>
    ) {
        return StoresTags.where('store_id', store_id).delete()
    }
}

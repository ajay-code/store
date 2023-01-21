import db from '#src/lib/knex/db.js'
import { Store } from '#src/models/store.model.js'
import { StoresTags } from '#src/models/stores_tags.model.js'
import { Knex } from 'knex'

export class StoreService {
    private limit = 10
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

    async getStores(opt: { page: number }) {
        const offset = this.limit * (opt.page - 1)
        return db
            .table<Store>('stores')
            .select('*')
            .offset(offset)
            .limit(this.limit)
    }

    async getStoreBySlug(slug: string) {
        return db.table<Store>('stores').select('*').where('slug', slug).first()
    }

    async countBySlug(slug: string, exceptStoreId?: number) {
        return db
            .table<Store>('stores')
            .count('slug', { as: 'slug' })
            .where('slug', slug)
            .modify((queryBuilder) => {
                if (exceptStoreId) {
                    queryBuilder.andWhereNot('id', exceptStoreId)
                }
            })
    }

    async getStoreByTag(tag: string) {
        const query = db
            .table<Store>('stores')
            .select('stores.*', 'tags.tag as tag', 'tags.id as tag_id')
            .innerJoin('stores_tags', 'stores_tags.store_id', '=', 'stores.id')
            .innerJoin('tags', 'tags.id', '=', 'stores_tags.tag_id')
            .modify((queryBuilder) => {
                if (tag) {
                    queryBuilder.where('tags.tag', tag)
                }
            })

        return query
    }
}

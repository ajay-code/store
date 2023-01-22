import db, { DBTableList } from '#src/lib/knex/db.js'
import { Store } from '#src/models/store.model.js'
import { StoresTags } from '#src/models/stores_tags.model.js'
import { Tag } from '#src/models/tag.model.js'
import { Knex } from 'knex'
import { joinTagsStores } from './joinTagsStores.js'

const limit = 10
export async function addStore(store: any, Store: Knex.QueryBuilder<Store>) {
    const [store_id] = await Store.insert({
        ...store,
        location_coordinates: db.raw(
            `ST_POINT (${store.location_coordinates[0]}, ${store.location_coordinates[1]})`
        ),
    })

    return store_id
}

export async function updateStore(
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

export async function addTagsToStore(
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

export async function removeTagsFromStore(
    store_id: number,
    StoresTags: Knex.QueryBuilder<StoresTags>
) {
    return StoresTags.where('store_id', store_id).delete()
}

export async function getStores(opt: { page: number }) {
    const offset = limit * (opt.page - 1)
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .with('stores', (qb) => {
            qb.table<Store>(DBTableList.STORE_TABLE)
                .select('*')
                .limit(limit)
                .offset(offset)
        })
        .select('stores.*')
        .modify(joinTagsStores)
}

export async function getStoreBySlug(slug: string) {
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .select('*')
        .where('slug', slug)
        .first()
}

export async function countBySlug(slug: string, exceptStoreId?: number) {
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .count('slug', { as: 'slug' })
        .where('slug', slug)
        .modify((qb) => {
            if (exceptStoreId) {
                qb.andWhereNot('id', exceptStoreId)
            }
        })
}

export async function getStoreByTag(tag: string) {
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .select('stores.*')
        .modify(joinTagsStores)
        .modify((qb) => {
            if (tag) {
                qb.where('tags.tag', tag)
            }
        })
}

export async function getTags() {
    return db.table<Tag>(DBTableList.TAGS_TABLE).select('*')
}

export async function getStoreNearPoint(x: number, y: number, distance = 1000) {
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .select(
            'slug',
            'name',
            'description',
            'location_address',
            'location_coordinates',
            'photo'
        )
        .where(
            db.raw(
                `ST_WITHIN(location_coordinates), ST_BUFFER(ST_POINT(${x}, ${y}), ${distance}))`
            )
        )
}
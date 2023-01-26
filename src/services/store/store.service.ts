import config from '#src/config/index.js'
import db, { DBTableList } from '#src/lib/knex/db.js'
import { Hearts } from '#src/models/hearts.js'
import { Review } from '#src/models/review.model.js'
import { Store } from '#src/models/store.model.js'
import { StoresTags } from '#src/models/stores_tags.model.js'
import { Tag } from '#src/models/tag.model.js'
import { Knex } from 'knex'
import { joinReviewCount } from './joinReviewCount.js'
import { joinReviews } from './joinReviews.js'
import { joinTagsStores } from './joinTagsStores.js'

const limit = config.PAGINATION.limit

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
                .select(`${DBTableList.STORE_TABLE}.*`)
                .modify(joinReviewCount)
                .limit(limit)
                .offset(offset)
        })
        .select(`${DBTableList.STORE_TABLE}.*`)
        .orderBy('created_at', 'desc')
        .modify(joinTagsStores)
}

export async function getStoreCount() {
    return db.table<Store>(DBTableList.STORE_TABLE).count({ count: '*' })
}

export async function getStoreBySlug(slug: string) {
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .select(`${DBTableList.STORE_TABLE}.*`)
        .where('slug', slug)
        .modify(joinTagsStores)
        .modify(joinReviews)
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

export async function getHeartsOfUser(user_id: number) {
    return db
        .table<Hearts>(DBTableList.HEART_TABLE)
        .select(`${DBTableList.STORE_TABLE}.*`)
        .where('user_id', user_id)
        .innerJoin(DBTableList.STORE_TABLE, (qb) => {
            qb.on(
                `${DBTableList.STORE_TABLE}.id`,
                '=',
                `${DBTableList.HEART_TABLE}.store_id`
            )
        })
        .modify(joinTagsStores)
}

export async function toggleHeartStore(store_id: number, user_id: number) {
    const isHearted = await db
        .table<Hearts>(DBTableList.HEART_TABLE)
        .where({ store_id, user_id })
        .first()
    if (isHearted) {
        return db
            .table<Hearts>(DBTableList.HEART_TABLE)
            .where({ store_id, user_id })
            .delete()
    }

    return db
        .table<Hearts>(DBTableList.HEART_TABLE)
        .insert({ store_id, user_id })
}

export async function getTags() {
    return db.table<Tag>(DBTableList.TAGS_TABLE).select('*')
}

export async function getStoreNearPoint(x: number, y: number, distance = 1000) {
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .select(
            'id',
            'slug',
            'name',
            'photo',
            'description',
            'location_address',
            'location_coordinates'
        )
        .where(
            db.raw(
                `ST_WITHIN(location_coordinates, ST_BUFFER(POINT(${x}, ${y}), ${distance}))`
            )
        )
}

export async function getTopStores() {
    return db
        .table<Store>(DBTableList.STORE_TABLE)
        .innerJoin<Review>(DBTableList.REVIEW_TABLE, (qb) => {
            qb.on(
                db.raw(
                    `${DBTableList.STORE_TABLE}.id = ${DBTableList.REVIEW_TABLE}.store`
                )
            )
        })
        .select(
            db.raw(
                `${DBTableList.STORE_TABLE}.*, AVG(reviews.rating) as avg_rating`
            )
        )
        .groupBy('stores.id')
        .having(db.raw('COUNT(reviews.id) > 1'))
        .orderBy('avg_rating', 'desc')
        .limit(10)
}

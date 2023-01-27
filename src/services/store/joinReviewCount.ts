import db from '#src/lib/knex/db.js'
import { Knex } from 'knex'

export function joinReviewCount(qb: Knex.QueryBuilder) {
    qb.select(db.raw('COUNT(reviews.id) as review_count'))
        .leftJoin('reviews', (qb) => {
            qb.on('reviews.store', '=', `stores.id`)
        })
        .groupBy(`stores.id`)
}

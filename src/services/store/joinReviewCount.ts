import db, { DBTableList } from '#src/lib/knex/db.js'
import { Knex } from 'knex'

export function joinReviewCount(
    qb: Knex.QueryBuilder,
    cteOrTableName: string = 'stores'
) {
    DBTableList.REVIEW_TABLE
    qb.select(db.raw('COUNT(reviews.id) as review_count'))
        .leftJoin('reviews', (qb) => {
            qb.on('reviews.store', '=', `${cteOrTableName}.id`)
        })
        .groupBy(`${cteOrTableName}.id`)
}
import db from '#src/lib/knex/db.js'
import { Knex } from 'knex'

export function joinTagsStores(
    qb: Knex.QueryBuilder,
    cteOrTableName: string = 'stores'
) {
    qb.select(db.raw('GROUP_CONCAT(tags.tag) as tags'))
        .leftJoin('stores_tags', (qb) => {
            qb.on('stores_tags.store_id', '=', `${cteOrTableName}.id`)
        })
        .leftJoin('tags', (qb) => {
            qb.on('tags.id', '=', 'stores_tags.tag_id')
        })
        .groupBy(`${cteOrTableName}.id`)
}

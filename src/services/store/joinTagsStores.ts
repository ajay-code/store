import { Knex } from 'knex'

export function joinTagsStores(
    qb: Knex.QueryBuilder,
    cteOrTableName: string = 'stores'
) {
    qb.select('tags.tag as tag', 'tags.id as tag_id')
        .leftJoin('stores_tags', (qb) => {
            qb.on('stores_tags.store_id', '=', `${cteOrTableName}.id`)
        })
        .leftJoin('tags', (qb) => {
            qb.on('tags.id', '=', 'stores_tags.tag_id')
        })
}

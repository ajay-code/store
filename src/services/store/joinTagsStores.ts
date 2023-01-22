import { Knex } from 'knex'

export function joinTagsStores(
    qb: Knex.QueryBuilder,
    cteOrTableName: string = 'stores'
) {
    qb.select('tags.tag as tag', 'tags.id as tag_id')
        .innerJoin('stores_tags', (qb) => {
            qb.on('stores_tags.store_id', '=', `${cteOrTableName}.id`)
        })
        .innerJoin('tags', (qb) => {
            qb.on('tags.id', '=', 'stores_tags.tag_id')
        })
}

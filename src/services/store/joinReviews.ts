import { Knex } from 'knex'

export function joinReviews(
    qb: Knex.QueryBuilder,
    cteOrTableName: string = 'stores'
) {
    qb.select(
        'reviews.id as review_id',
        'reviews.text as review_text',
        'reviews.rating as review_rating'
    ).leftJoin('reviews', (qb) => {
        qb.on('reviews.store', '=', `${cteOrTableName}.id`)
    })
}

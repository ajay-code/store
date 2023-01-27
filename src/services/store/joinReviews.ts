import { Knex } from 'knex'

export function joinReviews(
    qb: Knex.QueryBuilder,
    cteOrTableName: string = 'stores'
) {
    qb.select(
        'reviews.id as review_id',
        'reviews.text as review_text',
        'reviews.rating as review_rating',
        'reviews.created_at as review_created_at',
        'users.id as review_author_id',
        'users.email as review_author_email',
        'users.name as review_author_name'
    )
        .leftJoin('reviews', (qb) => {
            qb.on('reviews.store', '=', `${cteOrTableName}.id`)
        })
        .leftJoin('users', (qb) => {
            qb.on('users.id', '=', 'reviews.author')
        })
}

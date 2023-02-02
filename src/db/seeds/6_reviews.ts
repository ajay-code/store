import { DBTableList } from '#src/lib/knex/db.js'
import { Knex } from 'knex'
import reviews from '../data/reviews.json' assert { type: 'json' }

export const seed = async (knex: Knex) => {
    const reviewList = []

    let id = 1
    for (let review of reviews) {
        reviewList.push({
            id,
            author: review.author,
            store: review.store,
            text: review.text,
            rating: review.rating,
        })
        id++
    }

    await knex.table(DBTableList.REVIEW).insert(reviewList)
}

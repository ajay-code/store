import db from '#src/lib/knex/db.js'

export interface Review {
    id: number
    author: number
    store: number
    text: string
    rating: number
    created_at: Date
}

export default function getReviewModel() {
    return db.table<Review>('reviews')
}

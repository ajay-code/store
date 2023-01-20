import db from '#src/lib/knex/db.js'

export interface Review {
    id: number
    author: number
    store: number
    text: string
    rating: number
    created_at: Date
}

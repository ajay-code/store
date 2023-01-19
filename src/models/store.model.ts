import db from '#src/lib/knex/db.js'

export interface Store {
    id: number
    name: string
    slug: string
    description: string
    location_type: string
    location_coordinates: string
    location_address: string
    photo: string
    author: number
    created_at: Date
}

export default function getStoreModel() {
    return db.table<Store>('stores')
}

import * as knexPkg from 'knex'
import knexFile from './knexFile.js'

const { knex } = knexPkg.default
const db = knex(knexFile.development)

export const DBTableList = {
    USER: 'users',
    STORE: 'stores',
    REVIEW: 'reviews',
    TAGS: 'tags',
    STORES_TAGS: 'stores_tags',
    HEART: 'hearts',
}

export default db

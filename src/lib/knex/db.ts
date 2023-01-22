import * as knexPkg from 'knex'
import knexFile from './knexFile.js'

const { knex } = knexPkg.default
const db = knex(knexFile.development)

export const DBTableList = {
    USER_TABLE: 'users',
    STORE_TABLE: 'stores',
    REVIEW_TABLE: 'reviews',
    TAGS_TABLE: 'tags',
    STORES_TAGS_TABLE: 'stores_tags',
    HEART_TABLE: 'hearts',
}

export default db

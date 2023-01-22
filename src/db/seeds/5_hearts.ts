import { DBTableList } from '#src/lib/knex/db.js'
import { Knex } from 'knex'
import users from '../data/users.json' assert { type: 'json' }

export const seed = async (knex: Knex) => {
    const heartList = []

    for (let user of users) {
        for (let store_id of user.hearts) {
            heartList.push({ store_id, user_id: user.id })
        }
    }

    await knex.table(DBTableList.HEART_TABLE).insert(heartList)
}

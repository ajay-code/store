import { Knex } from 'knex'
import { PasswordService } from '#src/services/password.service.js'
import users from '../data/users.json' assert { type: 'json' }
const passwordService = new PasswordService()
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex: Knex) {
    await knex('users').del()

    const userList = []
    for (let user of users) {
        user.password = await passwordService.hash(user.password)
        userList.push({
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
        })
    }
    await knex('users').insert(userList)
}

import config from '#src/config/index.js'
import { Knex } from 'knex'

const client: string = config.DB.dbClient

const connection: Knex.StaticConnectionConfig = {
    host: config.DB.dbHost,
    port: config.DB.dbPort,
    user: config.DB.dbUser,
    password: config.DB.dbPassword,
    database: config.DB.dbName,
}

const migrations: Knex.MigratorConfig = {
    tableName: 'knex_migrations',
    directory: '../../db/migrations',
}

const seeds: Knex.SeederConfig = {
    directory: '../../db/seeds',
}

interface KnexFile {
    [key: string]: Knex.Config
}

export const knexFile: KnexFile = {
    development: {
        client,
        debug: true,
        connection,
        pool: {
            min: 0,
            max: 7,
        },
        migrations,
        seeds,
    },

    staging: {},

    production: {
        client,
        connection,
        pool: {
            min: 2,
            max: 10,
        },
        migrations,
    },
}

export default knexFile

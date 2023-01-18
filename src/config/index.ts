import './loadEnv.js'
import DB from './database.config.js'
import EMAIL from './email.config.js'

const NODE_ENV = process.env.NODE_ENV || 'development'
const BASE_URL = process.env.BASE_URL || 'http://localhost'
const APP_PORT = parseInt(process.env.APP_PORT || '') || 3000
const API_URL = `${BASE_URL}/api`
const APP_KEY = process.env.APP_KEY || null

if (!APP_KEY) {
    throw Error('Please define APP_KEY in [.env]')
}

const config = {
    NODE_ENV,
    BASE_URL,
    APP_PORT,
    API_URL,
    APP_KEY,
    DB,
    EMAIL,
}

export default config

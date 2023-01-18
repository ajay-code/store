#!/usr/bin/env node
import config from '#src/config/index.js'
import 'express-async-errors'
import http from 'node:http'
import app from './app.js'
import db from './lib/knex/db.js'

const port = config.APP_PORT
const baseUrl = config.BASE_URL

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`The website is running on ${baseUrl}:${port}`)
})

process.on('uncaughtException', (err) => {
    console.error(new Date().toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
})

process.on('beforeExit', (code) => {
    cleanupDB('beforeExit')
})

process.on('SIGINT', () => {
    cleanupDB('SIGINT')
    process.exit(1)
})

function cleanupDB(from: string = '--') {
    console.log('Destroy DB connection. From: ', from)
    db.destroy()
}

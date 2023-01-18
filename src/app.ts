import path from 'node:path'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import * as middleware from '#src/middleware/index.js'
import addRoutes from '#src/routes/index.routes.js'
import { getDirname } from '#src/utils/index.js'

const __dirname = getDirname(import.meta.url)
const app = express()

/**
 * parse request
 */
app.use(cookieParser())
app.use(express.json()) // parse json
app.use(express.urlencoded({ extended: false })) // parse form data

/**
 * add security middleware
 */
app.use(helmet())
// app.disable('x-powered-by')

/**
 * Serve static files form public dir
 */
app.use(express.static(path.resolve(__dirname, '../public')))

/**
 * add routes to the app
 */
addRoutes(app)

/**
 * middleware
 */
app.use(middleware.notFound)
app.use(middleware.errorHandler)

export default app

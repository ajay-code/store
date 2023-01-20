import { Express, Request, Response } from 'express'
import apiRouter from './api/api.routes.js'

/**
 * Add all the routes to the express app
 * @param app {Express}
 */
export const addRoutes = (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
        res.render('index', { title: 'Home Page' })
    })

    // add auth routes

    // add api/v1 routes
    app.use('/api', apiRouter)
}

export default addRoutes

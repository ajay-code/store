import { Express, Request, Response } from 'express'
import apiRouter from './api/api.routes.js'
import { isAuthenticated } from '#src/middleware/auth.middleware.js'
import authRouter from './auth.routes.js'
import getUserModel from '#src/models/user.model.js'

/**
 * Add all the routes to the express app
 * @param app {Express}
 */
export const addRoutes = (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
        res.render('index', { title: 'Home Page' })
    })

    app.get('/me', isAuthenticated, async (req: Request, res: Response) => {
        const User = getUserModel()
        const user = await User.select(
            'id',
            'email',
            'name',
            'created_at',
            'updated_at'
        )
            .where('id', req.payload.userId)
            .first()
        res.json(user)
    })

    app.get('/jwt-payload', isAuthenticated, (req: Request, res: Response) => {
        res.json(req.payload)
    })

    // add auth routes
    app.use(authRouter)

    // add api/v1 routes
    app.use('/api', isAuthenticated, apiRouter)
}

export default addRoutes

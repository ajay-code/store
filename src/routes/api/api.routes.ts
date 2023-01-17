import { isAuthenticated } from '#src/middleware/auth.middleware.js'
import getUserModel from '#src/models/user.model.js'
import { Request, Response, Router } from 'express'
import authRouter from './auth.routes.js'
import protectedRouter from './protected.routes.js'

let apiRouter: Router
const r = (apiRouter = Router())

r.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'welcome to api route' })
})

r.use(authRouter)

r.use('/', isAuthenticated, protectedRouter)

export default apiRouter

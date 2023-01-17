import { isAuthenticated } from '#src/middleware/auth.middleware.js'
import { Request, Response, Router } from 'express'
import authRouter from './auth.routes.js'
import protectedRouter from './protected.routes.js'
import storeRouter from './store.routes.js'

let apiRouter: Router
const r = (apiRouter = Router())

r.use(authRouter)
r.use(storeRouter)
r.use('/', isAuthenticated, protectedRouter)

export default apiRouter

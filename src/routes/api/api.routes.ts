import db from '#src/lib/knex/db.js'
import { isAuthenticated } from '#src/middleware/index.js'
import { Tag } from '#src/models/tag.model.js'
import { Request, Response, Router } from 'express'
import authRouter from './auth.routes.js'
import protectedRouter from './protected.routes.js'
import reviewRouter from './review.routes.js'
import storeRouter from './store.routes.js'

let apiRouter: Router
const r = (apiRouter = Router())

r.post('/tags', async (req: Request, res: Response) => {
    const { tag } = req.body
    const result = await db.table<Tag>('tags').insert({ tag })
    console.log(result)
    res.json(result)
})

r.use(authRouter)
r.use(storeRouter)
r.use(reviewRouter)
r.use(protectedRouter)

export default apiRouter

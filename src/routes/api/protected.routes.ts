import db from '#src/lib/knex/db.js'
import { User } from '#src/models/index.js'
import { Request, Response, Router } from 'express'

let protectedRouter: Router
let r = (protectedRouter = Router())

r.get('/me', async (req: Request, res: Response) => {
    const user = await db
        .table<User>('users')
        .select('id', 'email', 'name', 'created_at', 'updated_at')
        .where('id', req.payload.userId)
        .first()

    res.json(user)
})

r.get('/jwt-payload', (req: Request, res: Response) => {
    res.json(req.payload)
})

export default protectedRouter

import { isAuthenticated } from '#src/middleware/auth.middleware.js'
import getUserModel from '#src/models/user.model.js'
import { Request, Response, Router } from 'express'

let protectedRouter: Router
let r = (protectedRouter = Router())

r.get('/me', async (req: Request, res: Response) => {
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

r.get('/jwt-payload', (req: Request, res: Response) => {
    res.json(req.payload)
})

export default protectedRouter

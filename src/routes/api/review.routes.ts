import { reviewController } from '#src/controllers/index.js'
import { isAuthenticated } from '#src/middleware/auth.middleware.js'
import { Router } from 'express'

let reviewRouter: Router
const r = (reviewRouter = Router())

r.post('/reviews/:id', isAuthenticated, reviewController.addReview)

export default reviewRouter

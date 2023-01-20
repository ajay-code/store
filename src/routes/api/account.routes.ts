import { userController, authController } from '#src/controllers/index.js'
import { isAuthenticated } from '#src/middleware/auth.middleware.js'
import { Router } from 'express'

let accountRouter: Router
let r = (accountRouter = Router())

r.post('/account/forgot', authController.forgot)
r.post('/account/reset/:token', authController.reset)

r.route('/register').post(userController.register)
r.post('/account', isAuthenticated, userController.update)

export default accountRouter

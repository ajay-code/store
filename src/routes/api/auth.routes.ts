import { authController } from '#src/controllers/index.js'
import { Router } from 'express'

let authRouter: Router
const r = (authRouter = Router())

r.route('/login').post(authController.login)
r.route('/register').post(authController.register)
r.route('/logout').post(authController.logout)

r.route('/account/forgot').post(authController.forgot)
r.route('/account/reset/:token').post(authController.reset)
export default authRouter

import { authController } from '#src/controllers/index.js'
import { Router } from 'express'

let authRouter: Router
const r = (authRouter = Router())

r.route('/login').post(authController.login)

r.route('/logout').post(authController.logout)

export default authRouter

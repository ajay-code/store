import { Router } from 'express'
import * as authController from '#src/controllers/auth/auth.controller.js'

let authRouter: Router
const r = (authRouter = Router())

r.route('/login').post(authController.login)

r.route('/register').post(authController.register)

export default authRouter

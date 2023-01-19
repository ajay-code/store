import { storeController } from '#src/controllers/index.js'
import { isAuthenticated } from '#src/middleware/auth.middleware.js'
import { Router } from 'express'

let storeRouter: Router
let r = (storeRouter = Router())

r.get('/', storeController.getStores)
r.get('/stores', storeController.getStores)
r.get('/stores/page/:page', storeController.getStores)

r.get('/store/:slug', storeController.getStoreBySlug)

r.post(
    '/add',
    isAuthenticated,
    storeController.uploadPhoto.single('photo'),
    storeController.createStore
)
r.post('/add/:id', isAuthenticated, storeController.updateStore)
export default storeRouter

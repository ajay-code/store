import { storeController } from '#src/controllers/index.js'
import {
    isAuthenticated,
    isAuthorOfStore,
} from '#src/middleware/auth.middleware.js'
import { Router } from 'express'

let storeRouter: Router
let r = (storeRouter = Router())

r.get('/', storeController.getStores)
r.get('/stores', storeController.getStores)
r.get('/stores/page/:page', storeController.getStores)
r.get('/stores/near', storeController.getNearbyStores)
r.get('/store/:slug', storeController.getStoreBySlug)

r.get('/tags/', storeController.getStoresByTag)
r.get('/tags/:tag', storeController.getStoresByTag)

r.get('/hearts', isAuthenticated, storeController.getHearts)
r.post('/stores/:id/heart', isAuthenticated, storeController.heartStore)

r.post(
    '/add',
    isAuthenticated,
    storeController.uploadPhoto.single('photo'),
    storeController.createStore
)
r.post(
    '/add/:id',
    isAuthenticated,
    isAuthorOfStore,
    storeController.uploadPhoto.single('photo'),
    storeController.updateStore
)
export default storeRouter

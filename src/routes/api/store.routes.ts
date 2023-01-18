import { storeController } from '#src/controllers/index.js'
import { Router } from 'express'

let storeRouter: Router
let r = (storeRouter = Router())

r.get('/', storeController.getStores)
r.get('/stores', storeController.getStores)
r.get('/stores/page/:page', storeController.getStores)

r.get('/store/:slug', storeController.getStoreBySlug)

r.post('/add', storeController.createStore)
r.post('/add/:id', storeController.updateStore)
export default storeRouter

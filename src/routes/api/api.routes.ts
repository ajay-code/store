import { Router } from 'express'

let apiRouter: Router
const r = (apiRouter = Router())

r.get('/', (req, res) => {
    res.json({ msg: 'welcome to api route' })
})

export default apiRouter

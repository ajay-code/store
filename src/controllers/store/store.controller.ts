import { Request, Response } from 'express'

export const getStores = (req: Request, res: Response) => {
    const { page = 1 } = req.params
    res.send('get stores page: ' + page)
}

export const getStoreBySlug = (req: Request, res: Response) => {
    const { slug } = req.params
    res.send('get store by slug: ' + slug)
}

export const getStoresByTag = (req: Request, res: Response) => {
    const { tag } = req.params
    res.send('get stores by tag: ' + tag)
}

export const createStore = (req: Request, res: Response) => {
    res.send('create Store')
}

export const updateStore = (req: Request, res: Response) => {
    const { id } = req.params

    res.send('update store with id: ' + id)
}

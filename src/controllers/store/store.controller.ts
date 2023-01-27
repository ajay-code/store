import config from '#src/config/index.js'
import db from '#src/lib/knex/db.js'
import { Store, StoresTags } from '#src/models/index.js'
import { storeService } from '#src/services/index.js'
import { hydration } from '#src/utils/index.js'
import {
    addStoreSchema,
    latLongSchema,
    updateStoreSchema,
} from '#src/validators/index.js'
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { savePhoto } from './savePhoto.js'
import { slugify } from './slugify.js'

export { uploadPhoto } from './uploadPhoto.js'

type StoreData = {
    name: string
    description: string
    location_address: string
    location_coordinates: [number, number]
    slug: string
    author: number
    photo: string
}

async function createUniqueSlugForStore(name: string, store_id?: number) {
    let slug = slugify(name)
    const count = await storeService.countBySlug(slug, store_id)
    const slugCount = Number(count[0].slug)
    if (slugCount > 0) {
        slug = `${slug}-${slugCount + 1}`
    }
    return slug
}

export const createStore = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new Error('No file uploaded')
    }
    const data = addStoreSchema.parse(req.body)
    const photo = await savePhoto(req.file)
    let slug = await createUniqueSlugForStore(data.name)

    const storeData: StoreData = {
        name: data.name,
        description: data.description,
        location_address: data.location_address,
        location_coordinates: data.location_coordinates,
        slug,
        author: req.payload.userId,
        photo,
    }

    const storeId = await storeService.addStore(
        storeData,
        db.table<Store>('stores')
    )
    await storeService.addTagsToStore(
        storeId,
        data.tags,
        db.table<StoresTags>('stores_tags')
    )

    res.sendStatus(httpStatus.CREATED)
}

export const updateStore = async (req: Request, res: Response) => {
    const { id } = req.params
    const storeId = parseInt(id)
    const data = updateStoreSchema.parse(req.body)
    // create unique slug for store
    let slug = await createUniqueSlugForStore(data.name, storeId)

    const storeData: Optional<StoreData, 'photo'> = {
        name: data.name,
        description: data.description,
        location_address: data.location_address,
        location_coordinates: data.location_coordinates,
        slug,
        author: req.payload.userId,
    }
    if (req.file) {
        const photo = await savePhoto(req.file)
        storeData.photo = photo
    }

    await storeService.updateStore(
        storeId,
        storeData,
        db.table<Store>('stores')
    )
    await storeService.removeTagsFromStore(
        storeId,
        db.table<StoresTags>('stores_tags')
    )
    await storeService.addTagsToStore(
        storeId,
        data.tags,
        db.table<StoresTags>('stores_tags')
    )

    res.sendStatus(httpStatus.NO_CONTENT)
}

// query stores in different ways
export const getStores = async (req: Request, res: Response) => {
    const { page } = req.params
    const [stores, count] = await Promise.all([
        storeService.getStores({ page: parseInt(page ?? 1) }),
        storeService.getStoreCount(),
    ])

    const pages = Math.ceil(
        (count[0].count as number) / config.PAGINATION.limit
    )
    res.json({
        data: stores,
        count: count[0].count,
        pages,
        limit: config.PAGINATION.limit,
    })
}

export const getTopStores = async (req: Request, res: Response) => {
    const result = await storeService.getTopStores()

    res.json({
        data: result,
    })
}

export const getStoreBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params
    const result = await storeService.getStoreBySlug(slug)
    const store = hydration.hydrateStoresTagsReviews(result)

    res.json({
        data: store,
    })
}

export const getStoresByTag = async (req: Request, res: Response) => {
    const { tag } = req.params
    const tagList = await storeService.getTags()
    const result = await storeService.getStoreByTag(tag)
    const stores = hydration.hydrateStoresWithTags(result)

    res.json({ data: { stores, tags: tagList } })
}

export const getHearts = async (req: Request, res: Response) => {
    const userId = req.payload.userId
    const result = await storeService.getHeartsOfUser(userId)
    const stores = hydration.hydrateStoresWithTags(result)

    res.json({ data: stores })
}

export const heartStore = async (req: Request, res: Response) => {
    const userId = req.payload.userId
    const storeId = parseInt(req.params.id)

    await storeService.toggleHeartStore(storeId, userId)

    res.sendStatus(httpStatus.NO_CONTENT)
}

export const getNearbyStores = async (req: Request, res: Response) => {
    const { lat, long } = latLongSchema.parse(req.query)
    const result = await storeService.getStoreNearPoint(long, lat)

    res.json({ data: result })
}

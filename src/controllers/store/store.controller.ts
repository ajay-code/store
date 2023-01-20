import db from '#src/lib/knex/db.js'
import { Store, StoresTags } from '#src/models/index.js'
import { StoreService } from '#src/services/index.js'
import { addStoreSchema, updateStoreSchema } from '#src/validators/index.js'
import { Request, Response } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import { z } from 'zod'

const storeService = new StoreService()

export const uploadPhoto = multer({
    storage: multer.memoryStorage(),
    fileFilter(req: Request, file, next) {
        let isPhoto = false

        if (file.mimetype.startsWith('image/')) {
            isPhoto = true
        }
        if (!isPhoto) {
            next(new Error("this filetype isn't allowed"))
        }

        next(null, true)
    },
})

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

async function savePhoto(file: Express.Multer.File) {
    const dirname = 'public/uploads/'
    const filename = (
        Date.now() +
        '-' +
        file.fieldname +
        '.' +
        'webp'
    ).toLocaleLowerCase()

    await sharp(file.buffer)
        .resize(800)
        .toFile(dirname + filename)
    return filename
}

function slugify(name: string) {
    let slug = name.toLowerCase()
    //remove unwanted characters
    slug = slug.replace(/[^a-zA-Z0-9 -]/g, '')
    //replace spaces with hyphens
    slug = slug.replace(/\s+/g, '-')
    return slug
}

type StoreData = {
    name: string
    description: string
    location_address: string
    location_coordinates: [number, number]
    slug: string
    author: number
    photo: string
}

export const createStore = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new Error('No file uploaded')
    }

    const data = addStoreSchema.parse(req.body)

    const photo = await savePhoto(req.file)
    const storeData: StoreData = {
        name: data.name,
        description: data.description,
        location_address: data.location_address,
        location_coordinates: data.location_coordinates,
        slug: slugify(data.name),
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
    res.send(storeData)
}

export const updateStore = async (req: Request, res: Response) => {
    const { id } = req.params
    const storeId = parseInt(id)
    const data = updateStoreSchema.parse(req.body)
    const store: Optional<StoreData, 'photo'> = {
        name: data.name,
        description: data.description,
        location_address: data.location_address,
        location_coordinates: data.location_coordinates,
        slug: slugify(data.name),
        author: req.payload.userId,
    }
    if (req.file) {
        const photo = await savePhoto(req.file)
        store.photo = photo
    }

    await storeService.updateStore(storeId, data, db.table<Store>('stores'))
    await storeService.removeTagsFromStore(
        storeId,
        db.table<StoresTags>('stores_tags')
    )
    await storeService.addTagsToStore(
        storeId,
        data.tags,
        db.table<StoresTags>('stores_tags')
    )

    res.send('update store with id: ' + id)
}

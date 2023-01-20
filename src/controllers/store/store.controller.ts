import db from '#src/lib/knex/db.js'
import { Store } from '#src/models/store.model.js'
import { addStoreSchema } from '#src/validators/store.validators.js'
import { Request, Response } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import { z } from 'zod'

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
export const createStore = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new Error('No file uploaded')
    }

    const storeData: z.infer<typeof addStoreSchema> = addStoreSchema.parse(
        req.body
    )

    const photo = await savePhoto(req.file)

    const store = {
        ...storeData,
        slug: slugify(storeData.name),
        author: req.payload.userId,
        photo,
    }

    const Store = db.table<Store>('stores')
    await Store.insert({
        ...store,
        location_coordinates: db.raw(
            `POINT (${store.location_coordinates[0]}, ${store.location_coordinates[1]})`
        ),
    })
    res.send(store)
}

export const updateStore = (req: Request, res: Response) => {
    const { id } = req.params

    res.send('update store with id: ' + id)
}

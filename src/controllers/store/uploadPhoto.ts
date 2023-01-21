import { Request } from 'express'
import multer from 'multer'

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

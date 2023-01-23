import db from '#src/lib/knex/db.js'
import { addReviewSchema } from '#src/validators/review.validators.js'
import { Request, Response } from 'express'
import httpStatus from 'http-status'

export const addReview = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = addReviewSchema.parse({
        ...req.body,
        store: parseInt(id),
        author: req.payload.userId,
    })
    const result = await db.table('reviews').insert(data)

    res.sendStatus(httpStatus.NO_CONTENT)
}

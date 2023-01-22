import { z } from 'zod'

export const addReviewSchema = z.object({
    store: z.number(),
    author: z.number(),
    text: z.string(),
    rating: z.number().min(1).max(5),
})

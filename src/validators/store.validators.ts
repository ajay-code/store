import * as z from 'zod'

export const addStoreSchema = z.object({
    name: z.string(),
    description: z.string(),
    location_coordinates: z.preprocess((val: any) => {
        return val.map((str: string) => parseFloat(str))
    }, z.tuple([z.number(), z.number()])),
    location_address: z.string(),
})

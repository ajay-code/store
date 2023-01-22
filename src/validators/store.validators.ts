import * as z from 'zod'

export const addStoreSchema = z.object({
    name: z.string(),
    description: z.string(),
    location_address: z.string(),
    location_coordinates: z.preprocess((val: any) => {
        return val.map((str: string) => parseFloat(str))
    }, z.tuple([z.number(), z.number()])),
    tags: z.preprocess((val: any) => {
        if (typeof val !== 'string') return val
        return val.split(',').map((num) => parseInt(num))
    }, z.array(z.number())),
})

export const updateStoreSchema = z.object({
    name: z.string(),
    description: z.string(),
    location_address: z.string(),
    location_coordinates: z.preprocess((val: any) => {
        return val.map((str: string) => parseFloat(str))
    }, z.tuple([z.number(), z.number()])),
    tags: z.preprocess((val: any) => {
        if (typeof val !== 'string') return val
        return val.split(',').map((num) => parseInt(num))
    }, z.array(z.number())),
})

export const latLongSchema = z.object({
    lat: z.preprocess((val: any) => parseFloat(val), z.number()),
    long: z.preprocess((val: any) => parseFloat(val), z.number()),
})

import { Express } from 'express'

export declare global {
    type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

    namespace Express {
        interface User extends UserApi {
            id: number
        }
    }
}

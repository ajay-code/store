import { Express } from 'express'

export declare global {
    namespace Express {
        interface User extends UserApi {
            id: number
        }
    }
}

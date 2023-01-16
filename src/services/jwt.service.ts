import config from '#src/config/index.config.js'
import jwt from 'jsonwebtoken'

export type JWTPayload = {
    userId: number
    email: string
}

class JWTService {
    private secretKey: string
    private expiresIn = '28d'

    constructor(secret: string) {
        this.secretKey = secret
    }

    public generateToken(
        payload: JWTPayload,
        opt?: {
            expiresIn: string | number
        }
    ): string {
        return jwt.sign(payload, this.secretKey, {
            expiresIn: opt?.expiresIn ?? this.expiresIn,
        })
    }

    public verifyToken(token: string) {
        try {
            let decoded = jwt.verify(token, this.secretKey)
            return decoded
        } catch (error) {
            return false
        }
    }
}

export default new JWTService(config.APP_KEY)

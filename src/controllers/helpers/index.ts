import { User } from '#src/models/index.js'
import jwtService, { JWTPayload } from '#src/services/jwt.service.js'

export function makeJwtTokenForUser(user: User) {
    const jwtPayload: JWTPayload = {
        email: user.email,
        userId: user.id,
    }
    return jwtService.generateToken(jwtPayload)
}

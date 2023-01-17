import { User, UserInfo } from '#src/models/user.model.js'

export const getUserInfo = (user: User) => {
    let userInfo: UserInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }
    return userInfo
}

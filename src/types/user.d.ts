import { User } from '#src/models/user.model.js'

interface UserApi
    extends Omit<User, 'password' | 'created_at' | 'updated_at'> {}

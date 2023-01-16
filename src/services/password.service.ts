import bcrypt from 'bcrypt'

export class PasswordService {
    private slatRounds: number

    constructor(saltRounds: number) {
        this.slatRounds = saltRounds
    }

    public hash(password: string) {
        return bcrypt.hash(password, this.slatRounds)
    }

    public compare(password: string, hash: string) {
        return bcrypt.compare(password, hash)
    }
}

export default new PasswordService(10)

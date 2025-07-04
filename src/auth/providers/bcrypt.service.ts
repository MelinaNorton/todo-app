import * as bcrypt from 'bcrypt'
require('bcrypt')

export class BcryptService {
    private readonly rounds = 10
    constructor(){
    }

    async hashPass(password:string):Promise<string>{
        const salt = await bcrypt.genSalt(this.rounds)
        const securepass = await bcrypt.hash(password, salt)
        return securepass
    }

    async comparePasswords(password:string, checkPassword:string):Promise<boolean>{
        return bcrypt.compare(password, checkPassword)
    }
}
import * as bcrypt from 'bcrypt'
require('bcrypt')

export class BcryptService {
    private readonly salt;
    constructor(){
        this.salt = bcrypt.genSalt(10)
    }

    async hashPass(password:string):Promise<string>{
        const securepass = await bcrypt.hash(password, this.salt)
        return securepass
    }

    comparePasswords(password:string, checkPassword:string):boolean{
        return bcrypt.comparePasswords(password, checkPassword)
    }
}
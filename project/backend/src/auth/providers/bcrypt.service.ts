import * as bcrypt from 'bcrypt'
require('bcrypt')

//defines the rounds for our genSalt function for later use
export class BcryptService {
    private readonly rounds = 10
    constructor(){
    }

//function that handles the bcrypt hashing-login for the passed in passowrd-value & returns
    async hashPass(password:string):Promise<string>{
        const salt = await bcrypt.genSalt(this.rounds)
        const securepass = await bcrypt.hash(password, salt)
        return securepass
    }

//function that compares the two passed-in passwords via bcrypt's compare() function & returns
    async comparePasswords(password:string, checkPassword:string):Promise<boolean>{
        return bcrypt.compare(password, checkPassword)
    }
}
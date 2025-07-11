import { Injectable } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { UserService } from 'src/users/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { TokenService } from './providers/token.service';
import { BcryptService } from './providers/bcrypt.service';
import { User } from 'src/users/interface/user.interface';

//defines instances of TokenService, BcryptService, and UserService to carry outh authentication logic
@Injectable()
export class AuthService {
  constructor(
        private tokenService: TokenService,
        private bcryptService : BcryptService,
        private userService: UserService,
  ) { }

//calls our user service's "create" function with the passed-in data
  async signup(createAuthDto: Signup) {
    return this.userService.create(createAuthDto);
  }

//validates the login data passed to our function by first 1)validating the existence of the username in our DB, then
//2) comparing the passed-in passpwrd to the returned user's password via bcrypt-logic (stored for modularization within
//our BcryptService)
  async validate(loginAuthDto: Login):Promise<User>{
    const username = loginAuthDto.username
    console.log("Ran before findOne")
    const exists = await this.userService.findOne({username})
    if(!exists){
      throw new UnauthorizedException('Invalid Username');
    }
    console.log("Ran before bcrypt")
    const match = this.bcryptService.comparePasswords(loginAuthDto.password, exists.password)
    if(!match){
      throw new UnauthorizedException('Invalid Password');
    }
    return exists
  }

//carry out our login data using our afformentioned validate() helper-function, and then our TokenService's createToken\
//funcrion to attatch our successfully authenticated user's session with the token needed to access certain endpoints
  async login(loginAuthoDto : Login):Promise<{token:string, exists:User}> {
    console.log("Ran before validation-line")
    const exists = await this.validate(loginAuthoDto)
    console.log("Ran before create-Token line")
    const token = await this.tokenService.createToken(exists)
    console.log("Ran before return")
    return {token, exists};
  }
}

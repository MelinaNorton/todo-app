import { Injectable } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { UserService } from 'src/users/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { TokensService } from 'src/tokens/tokens.service';
import { BcryptService } from './providers/bcrypt.service';
import { User } from 'src/users/interface/user.interface';
import { Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';

//defines instances of TokenService, BcryptService, and UserService to carry outh authentication logic
@Injectable()
export class AuthService {
  constructor(
        private tokensService: TokensService,
        private bcryptService : BcryptService,
        private userService: UserService,
  ) { }

//calls our user service's "create" function with the passed-in data
  async signup(createAuthDto: Signup) {
    const user = await this.userService.create(createAuthDto);
    return user
  }

//validates the login data passed to our function by first 1)validating the existence of the username in our DB, then
//2) comparing the passed-in passpwrd to the returned user's password via bcrypt-logic (stored for modularization within
//our BcryptService)
  async validate(loginAuthDto: Login):Promise<User>{
    const username = loginAuthDto.username
    const exists = await this.userService.findOne({username})
    if(!exists){
      throw new UnauthorizedException('Invalid Username');
    }
    const match = this.bcryptService.comparePasswords(loginAuthDto.password, exists.password)
    if(!match){
      throw new UnauthorizedException('Invalid Password');
    }
    return exists
  }

//carry out our login data using our afformentioned validate() helper-function, and then our TokenService's createToken\
//funcrion to attatch our successfully authenticated user's session with the token needed to access certain endpoints
  async login(loginAuthoDto : Login, @Res({ passthrough: true }) res: Response, @Req() req: Request):Promise<{token:string, accesstoken:string}> {
    const exists = await this.validate(loginAuthoDto)
    const existing = req.cookies['refreshtoken']
    if(existing){
      this.tokensService.validateRefreshToken(existing)
      this.tokensService.revokeRefreshToken(existing.jti)
    }
    const newRefreshToken = await this.tokensService.createToken(exists)
    this.tokensService.attatchToken(newRefreshToken, res)
    const newAccessToken = await this.tokensService.createAccessToken({sub: exists._id, username:exists.username})
    return {token:newRefreshToken, accesstoken:newAccessToken};
  }
}

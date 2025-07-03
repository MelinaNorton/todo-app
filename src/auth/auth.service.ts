import { Injectable } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { TokenService } from './providers/token.service';
import { BcryptService } from './providers/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
        private tokenService: TokenService,
        private bcryptService : BcryptService,
        private configService: ConfigService,
        private userService: UserService,
  ) { }

  async signup(createAuthDto: Signup) {
    return this.userService.create(createAuthDto);
  }

  async login(loginAuthoDto : Login):Promise<string> {
    const username = loginAuthoDto.username
    const exists = await this.userService.findOne({username})
    if(!exists){
      throw new UnauthorizedException('Invalid Credentials');
    }
    const match = this.bcryptService.comparePasswords(loginAuthoDto.password, exists.password)
    if(match){
      const token = await this.tokenService.createToken(exists)
      return token;
    }
    else{
      throw new UnauthorizedException("Passwords do not match")
    }
  }
}

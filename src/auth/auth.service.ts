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
import { User } from 'src/users/interface/user.interface';

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

  async login(loginAuthoDto : Login):Promise<string> {
    const exists = await this.validate(loginAuthoDto)
    const token = await this.tokenService.createToken(exists)
    return token;
  }
}

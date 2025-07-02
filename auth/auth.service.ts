import { Injectable } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { log } from 'node:util';
import { Users } from 'users/interface/users.interface';

@Injectable()
export class AuthService {
  constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private usersService: UsersService,
  ) { }

  async signup(createAuthDto: Signup) {
    return this.usersService.create(createAuthDto);
  }

  async login(loginAuthoDto : Login):Promise<Users> {
    const username = loginAuthoDto.username
    const exists = await this.usersService.findOne({username})
    if(!exists){
      throw new UnauthorizedException('Invalid Credentials');
    }
    const match = await bcrypt.compare(loginAuthoDto.password, exists.password)
    if(match){
      return exists
    }
    else{
      throw new UnauthorizedException("Passwords do not match")
    }
  }
}

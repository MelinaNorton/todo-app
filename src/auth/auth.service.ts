import { Injectable } from '@nestjs/common';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'users/user.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
        private jwtService: JwtService,
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
    const match = await bcrypt.compare(loginAuthoDto.password, exists.password)
    if(match){
      const token = await this.jwtService.sign({ id: exists._id, username: exists.username }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES'),
      })
      return token;
    }
    else{
      throw new UnauthorizedException("Passwords do not match")
    }
  }
}

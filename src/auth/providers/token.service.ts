import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { User } from "users/interface/user.interface"
import { Res } from "@nestjs/common"
import { Response } from 'express';

@Injectable()
export class TokenService {
    //constructor
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService 
    ){
        //pull in config values for reference (note configService needs to be called within tge constructior, since the code below
        //will) run first before configService is initialized & throw an error
        const tokenname = 'token'
        const secret = this.configService.get("JWT_SECRET")
        const expiry = this.configService.get("JWT_EXPIRES")
    }
    //sign function
    async createToken(user:User):Promise<string>{
        const token = await this.jwtService.sign({ id: user._id, username: user.username }, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES'),
      })
      return token;
    }
    //attach
    async attatchToken(token:string, @Res({ passthrough: true }) res: Response):Promise<boolean>{
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: '/',
        });
        return true;
    }

    //detach
    async detatchToken(@Res({ passthrough: true }) res: Response):Promise<boolean>{
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: '/',
        })
        return true
    }

    async 
}
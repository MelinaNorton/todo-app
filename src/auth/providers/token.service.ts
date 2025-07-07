import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { User } from "src/users/interface/user.interface"
import { Res } from "@nestjs/common"
import { Response } from 'express';

@Injectable()
export class TokenService {
    private readonly tokenname;
    private readonly secret;
    private readonly expiry;
//constructor defining our instances of JwtService & ConfigService for later use
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService 
    ){

//pull in config values for reference (note configService needs to be called within tge constructior, since the code below
//will) run first before configService is initialized & throw an error
        this.tokenname = 'token'
        this.secret = this.configService.get("JWT_SECRET")
        this.expiry = this.configService.get("JWT_EXPIRES")
    }

//sign function for craeting our authenticated user with the token needed to access certain endpoints via jwtService's
//sign() function & the .env values pulled using configService
    async createToken(user:User):Promise<string>{
        const token = await this.jwtService.sign({ id: user._id, username: user.username }, {
            secret: this.secret,
            expiresIn: this.expiry,
      })
      return token;
    }

//actual logic for attaching the above-created token to the Response object with our desired parameters
    async attatchToken(token:string, @Res({ passthrough: true }) res: Response):Promise<boolean>{
        res.cookie(this.tokenname, token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: '/',
        });
        return true;
    }

//detach the authenticated token on logout, again using the Response object
    async detatchToken(@Res({ passthrough: true }) res: Response):Promise<boolean>{
        res.clearCookie(this.tokenname, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: '/',
        })
        return true
    }
}
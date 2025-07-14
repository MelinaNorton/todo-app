import { Injectable, NotFoundException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { User } from "src/users/interface/user.interface"
import { Res } from "@nestjs/common"
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { CreateTokenDto } from "./dto/create-token.dto"
import { UnauthorizedException } from "@nestjs/common"
import { Token } from "./interface/tokens.interface"

@Injectable()
export class TokensService {
    private readonly refreshtokenname;
    private readonly refreshsecret;
    private readonly refreshexpiry;
    private readonly accesstokenname;
    private readonly accesssecret;
    private readonly accessexpiry;

//constructor defining our instances of JwtService & ConfigService for later use
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectModel('Token') 
        private readonly tokensModel: Model <Token>
    ){

//pull in config values for reference (note configService needs to be called within tge constructior, since the code below
//will) run first before configService is initialized & throw an error
        this.refreshtokenname = 'refreshtoken'
        this.refreshsecret = this.configService.get("JWT_REFRESH_SECRET")
        this.refreshexpiry = this.configService.get("JWT_REFRESH_EXPIRES")
        this.accesstokenname = 'accesstoken'
        this.accesssecret = this.configService.get("JWT_ACCESS_SECRET")
        this.accessexpiry = this.configService.get("JWT_ACCESS_EXPIRES")
    }

    async create(createTokenDto: CreateTokenDto):Promise<Token> {
        const newToken = new this.tokensModel(createTokenDto)  
        await newToken.save()
        return newToken
      }
//sign function for craeting our authenticated user with the token needed to access certain endpoints via jwtService's
//sign() function & the .env values pulled using configService
    async createToken(user:User):Promise<string>{
        const jti = randomUUID()
        console.log(this.refreshsecret)
        const token = await this.jwtService.sign({ sub: user._id, username: user.username, type:"refresh" , jti: jti}, {
            secret: this.refreshsecret,
            expiresIn: this.refreshexpiry,
      })
      return token;
    }

    async createAccessToken(user:User):Promise<string>{
        const token = await this.jwtService.sign({ sub:user._id, username: user.username, type:"access"},{
            secret: this.accesssecret,
            expiresIn: this.accessexpiry
        })
        return token;
    }
//actual logic for attaching the above-created token to the Response object with our desired parameters
    async attatchToken(token:string, res: Response):Promise<boolean>{
        res.cookie(this.refreshtokenname, token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600 * 1000,
            path: '/',
        });
        return true;
    }

//detach the authenticated token on logout, again using the Response object
    async detatchToken(@Res({ passthrough: true }) res: Response):Promise<boolean>{
        console.log("RAN!")
        res.clearCookie(this.refreshtokenname, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        })
        return true
    }

    async validateRefreshToken(token:string):Promise<string>{
        const decodedToken = await this.jwtService.verifyAsync<{sub:string, username:string, type:string, jti:string}>(
        token,
        {secret: this.refreshsecret}
        )
        if(decodedToken.type != "refresh"){
            throw new UnauthorizedException("Attempted to use an access token as a refresh token")
        }
        //find the jti in mongodb
        return token
    }

    async validateAccessToken(token:string):Promise<string>{
        const decodedToken = await this.jwtService.verifyAsync<{sub:string, username:string, type:string, jti:string}>(
        token,
        {secret: this.refreshsecret}
        )
        return token
    }

    async revokeRefreshToken(jti:string):Promise<string>{
        const revoked = this.tokensModel.findOneAndDelete({jti:jti})
        return jti
    }

    async findOne(jti:string):Promise<boolean>{
        const found = this.tokensModel.findOne({jti:jti})
        if(!found){
            throw new NotFoundException("Refresh Token Missing or Revoked")
        }
        return true
    }
}
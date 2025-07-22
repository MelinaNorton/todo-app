import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, Req } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { Response } from 'express';
import { Token } from './interface/tokens.interface';
import { User } from 'src/users/interface/user.interface';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.authguard';
import { JwtRefreshGuard } from './guards/jwt.guards';

@Controller('Token')
export class TokensController {
constructor(
    private readonly tokensService: TokensService,
    private jwtService: JwtService
  ) {}

  @UseGuards(JwtRefreshGuard)
  @Post('refreshtoken')
  async createAndAttachRefreshToken(user:User, @Res({ passthrough: true }) res: Response):Promise<string>{
    const refreshtoken = await this.tokensService.createToken(user)
    this.tokensService.attatchToken(refreshtoken, res)
    return refreshtoken
  }


  @Post('accesstoken')
  async createAccessToken({sub, username}:{sub:string, username:string}):Promise<string>{
    return this.tokensService.createAccessToken({sub, username})
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshAccessToken(@Req() req, @Res({ passthrough: true }) res: Response){
    //grab refresh token from requets object
    const user = req.user

    //verify signature, exp&iat, and type
    console.log("old token: ", user)
    //if(!this.tokensService.validateRefreshToken(old)){throw new UnauthorizedException("Invalid Token Presented")}

    
    //revoke
    console.log("revoking old token...")
    this.tokensService.revokeRefreshToken(user.jti)

    //create new token for Response object
    console.log("creating new token...")
    const newRefreshToken = await this.tokensService.createToken(user)
    const newRefreshTokenData = this.jwtService.decode(newRefreshToken)

    //create mongo entry for new refresh token
    console.log("entering data into mongo...")
    const newRefreshTokenDB = this.tokensService.create({jti: newRefreshTokenData.jti, sub: newRefreshTokenData.sub, username: newRefreshTokenData.username})

    //create new access token to be attached in the JSON payload
    console.log("creatung new access token...")
    const newAccessToken = this.tokensService.createAccessToken({sub:user.sub, username:user.username})
    return newAccessToken
  }
}
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

@Controller('Token')
export class TokensController {
constructor(
    private readonly tokensService: TokensService,
    private jwtService: JwtService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('refreshtoken')
  async createAndAttachRefreshToken(user:User, @Res({ passthrough: true }) res: Response):Promise<string>{
    const refreshtoken = await this.tokensService.createToken(user)
    this.tokensService.attatchToken(refreshtoken, res)
    return refreshtoken
  }


  @Post('accesstoken')
  async createAccessToken(user:User):Promise<string>{
    return this.tokensService.createAccessToken(user)
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('refresh')
  async refreshAccessToken(@Req() req, @Res({ passthrough: true }) res: Response){
    //grab refresh token from requets object
    const old = req.cookies['refreshtoken']
    const user = old.sub

    //verify signature, exp&iat, and type
    if(!this.tokensService.validateRefreshToken(old)){throw new UnauthorizedException("Invalid Token Presented")}

    
    //revoke
    this.tokensService.revokeRefreshToken(old.jti)

    //create new token for Response object
    const newRefreshToken = await this.tokensService.createToken(user)
    const newRefreshTokenData = this.jwtService.decode(newRefreshToken)

    //create mongo entry for new refresh token
    const newRefreshTokenDB = this.tokensService.create({jti: newRefreshTokenData.jti, sub: newRefreshTokenData.sub, username: newRefreshTokenData.username})

    //create new access token to be attached in the JSON payload
    const newAccessToken = this.tokensService.createAccessToken(user)
    return newAccessToken
  }
}
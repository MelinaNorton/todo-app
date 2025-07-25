import { Controller, Post, Res, Req } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { Response } from 'express';
import { User } from 'src/users/interface/user.interface';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { JwtRefreshGuard } from './guards/jwt.guards';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

@Controller('Token')
export class TokensController {
constructor(
    private readonly tokensService: TokensService,
    private jwtService: JwtService
  ) {}

  @UseGuards(ThrottlerGuard, JwtRefreshGuard)
  @Post('refreshtoken')
  async createAndAttachRefreshToken(user:User, @Res({ passthrough: true }) res: Response):Promise<string>{
    const refreshtoken = await this.tokensService.createToken(user)
    this.tokensService.attatchToken(refreshtoken, res)
    return refreshtoken
  }


  @UseGuards(ThrottlerGuard)
  @Post('accesstoken')
  async createAccessToken({sub, username}:{sub:string, username:string}):Promise<string>{
    return this.tokensService.createAccessToken({sub, username})
  }

  @UseGuards(ThrottlerGuard, JwtRefreshGuard)
  @Post('refresh')
  async refreshAccessToken(@Req() req, @Res({ passthrough: true }) res: Response){
    //grab refresh token from requets object
    const user = req.user
    
    //revoke
    this.tokensService.revokeRefreshToken(user.jti)

    //create new token for Response object
    const newRefreshToken = await this.tokensService.createToken(user)
    const newRefreshTokenData = this.jwtService.decode(newRefreshToken)

    //create mongo entry for new refresh token
    const newRefreshTokenDB = this.tokensService.create({jti: newRefreshTokenData.jti, sub: newRefreshTokenData.sub, username: newRefreshTokenData.username})

    //create new access token to be attached in the JSON payload
    const newAccessToken = this.tokensService.createAccessToken({sub:user.sub, username:user.username})
    return newAccessToken
  }
}
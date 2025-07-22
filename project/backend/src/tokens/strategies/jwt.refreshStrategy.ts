import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens.service';

const RefreshCookieExtractor = (req : Request): string | null =>{
    if(!req?.cookies){
        console.error("No Request recieved from CookieExtractor")
        return null;
    }
   return req.cookies['refreshtoken'] ?? null;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
  constructor(config: ConfigService, private readonly tokensService: TokensService,) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshCookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET')!,
    });
  }
    async validate(payload: any) {
        if(payload.type != "refresh"){
          throw new UnauthorizedException("Token Type not Valid: Expected Refresh Token")
        }
        const found = await this.tokensService.findOne(payload.jti)
        if (!found){
          throw new UnauthorizedException("Refresh Token Missing or Revoked")
        }
        return {jti:payload.jti, sub:payload.sub, username:payload.username}
  }
}
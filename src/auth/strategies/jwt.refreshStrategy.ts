import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

const CookieExtractor = (req : Request): string | null =>{
    if(!req?.cookies){
        console.error("No Request recieved from CookieExtractor @/auth/jwt.strategy.ts")
        return null;
    }
   return req.cookies['token'] ?? null;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy){
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([CookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }
    async validate(payload: any) {
        return { username: payload.username };
  }
}
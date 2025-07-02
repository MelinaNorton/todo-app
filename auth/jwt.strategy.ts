import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

const CookieExtractor = (req : Request): string | null =>{
    if(!req || !req.cookies){
        console.error("No Request recieved from CookieExtractor @/auth/jwt.strategy.ts")
        return null;
    }
    const token = req['token'];
    if(!token){
        console.error("No Token available on request from CookieExtractor @/auth/jwt.strategy.ts")
        return null;
    }
    return token;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
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
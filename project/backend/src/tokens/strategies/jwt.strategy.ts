import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens.service';

const CookieExtractor = (req : Request): string | null =>{
    if(!req?.cookies){
        console.error("No Request recieved from CookieExtractor @/auth/jwt.strategy.ts")
        return null;
    }
   return req.cookies['token'] ?? null;
}

const LoggingExtractor = (req: Request): string | null => {
  // log whatever the client actually sent
  console.log('→ RAW auth header:', req.headers.authorization);
  // now invoke the built-in Bearer parser:
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(config: ConfigService, private readonly tokensService: TokensService,) {
    super({
      jwtFromRequest: LoggingExtractor,
      ignoreExpiration: true,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET')!,
    });
  }

    async validate(payload: any) {
        console.log("reached validate")
        if(payload.type != "access"){
          throw new UnauthorizedException("Token Type not Valid: Expected Access Token")
        }
        const found = await this.tokensService.findOne(payload.jti)
        if (!found){
          throw new UnauthorizedException("Refresh Token Missing or Revoked")
        }
        return {jti:payload.jti, sub:payload.sub, username:payload.username}
  }
}
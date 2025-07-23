"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const tokens_service_1 = require("../tokens.service");
const CookieExtractor = (req) => {
    if (!req?.cookies) {
        console.error("No Request recieved from CookieExtractor @/auth/jwt.strategy.ts");
        return null;
    }
    return req.cookies['token'] ?? null;
};
const LoggingExtractor = (req) => {
    console.log('→ RAW auth header:', req.headers.authorization);
    return passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    tokensService;
    constructor(config, tokensService) {
        super({
            jwtFromRequest: LoggingExtractor,
            ignoreExpiration: true,
            secretOrKey: config.get('JWT_ACCESS_SECRET'),
        });
        this.tokensService = tokensService;
    }
    async validate(payload) {
        console.log("reached validate");
        if (payload.type != "access") {
            throw new common_1.UnauthorizedException("Token Type not Valid: Expected Access Token");
        }
        const found = await this.tokensService.findOne(payload.jti);
        if (!found) {
            throw new common_1.UnauthorizedException("Refresh Token Missing or Revoked");
        }
        return { jti: payload.jti, sub: payload.sub, username: payload.username };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, tokens_service_1.TokensService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map
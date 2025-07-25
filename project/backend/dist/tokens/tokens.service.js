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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
const crypto_1 = require("crypto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_3 = require("@nestjs/common");
let TokensService = class TokensService {
    jwtService;
    configService;
    tokensModel;
    refreshtokenname;
    refreshsecret;
    refreshexpiry;
    accesstokenname;
    accesssecret;
    accessexpiry;
    constructor(jwtService, configService, tokensModel) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.tokensModel = tokensModel;
        this.refreshtokenname = 'refreshtoken';
        this.refreshsecret = this.configService.get("JWT_REFRESH_SECRET");
        this.refreshexpiry = this.configService.get("JWT_REFRESH_EXPIRES");
        this.accesstokenname = 'accesstoken';
        this.accesssecret = this.configService.get("JWT_ACCESS_SECRET");
        this.accessexpiry = this.configService.get("JWT_ACCESS_EXPIRES");
    }
    async create(createTokenDto) {
        const newToken = new this.tokensModel(createTokenDto);
        await newToken.save();
        return newToken;
    }
    async createToken(user) {
        const jti = (0, crypto_1.randomUUID)();
        const token = await this.jwtService.sign({ sub: user._id, username: user.username, type: "refresh", jti: jti }, {
            secret: this.refreshsecret,
            expiresIn: this.refreshexpiry,
        });
        return token;
    }
    async createAccessToken({ sub, username }) {
        const token = await this.jwtService.sign({ sub: sub, username: username, type: "access" }, {
            secret: this.accesssecret,
            expiresIn: this.accessexpiry
        });
        return token;
    }
    async attatchToken(token, res) {
        res.cookie(this.refreshtokenname, token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });
        return true;
    }
    async detatchToken(res) {
        res.clearCookie(this.refreshtokenname, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        return true;
    }
    async validateRefreshToken(token) {
        const decodedToken = await this.jwtService.verifyAsync(token, { secret: this.refreshsecret });
        if (decodedToken.type != "refresh") {
            throw new common_3.UnauthorizedException("Attempted to use an access token as a refresh token");
        }
        return token;
    }
    async validateAccessToken(token) {
        const decodedToken = await this.jwtService.verifyAsync(token, { secret: this.refreshsecret });
        return token;
    }
    async revokeRefreshToken(jti) {
        const revoked = this.tokensModel.findOneAndDelete({ jti: jti });
        return jti;
    }
    async findOne(jti) {
        const found = this.tokensModel.findOne({ jti: jti });
        if (!found) {
            throw new common_1.NotFoundException("Refresh Token Missing or Revoked");
        }
        return true;
    }
};
exports.TokensService = TokensService;
__decorate([
    __param(0, (0, common_2.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokensService.prototype, "detatchToken", null);
exports.TokensService = TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)('Token')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        mongoose_2.Model])
], TokensService);
//# sourceMappingURL=tokens.service.js.map
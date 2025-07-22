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
exports.TokensController = void 0;
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("./tokens.service");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
const jwt_guards_1 = require("./guards/jwt.guards");
let TokensController = class TokensController {
    tokensService;
    jwtService;
    constructor(tokensService, jwtService) {
        this.tokensService = tokensService;
        this.jwtService = jwtService;
    }
    async createAndAttachRefreshToken(user, res) {
        const refreshtoken = await this.tokensService.createToken(user);
        this.tokensService.attatchToken(refreshtoken, res);
        return refreshtoken;
    }
    async createAccessToken({ sub, username }) {
        return this.tokensService.createAccessToken({ sub, username });
    }
    async refreshAccessToken(req, res) {
        const user = req.user;
        console.log("old token: ", user);
        console.log("revoking old token...");
        this.tokensService.revokeRefreshToken(user.jti);
        console.log("creating new token...");
        const newRefreshToken = await this.tokensService.createToken(user);
        const newRefreshTokenData = this.jwtService.decode(newRefreshToken);
        console.log("entering data into mongo...");
        const newRefreshTokenDB = this.tokensService.create({ jti: newRefreshTokenData.jti, sub: newRefreshTokenData.sub, username: newRefreshTokenData.username });
        console.log("creatung new access token...");
        const newAccessToken = this.tokensService.createAccessToken({ sub: user.sub, username: user.username });
        return newAccessToken;
    }
};
exports.TokensController = TokensController;
__decorate([
    (0, common_2.UseGuards)(jwt_guards_1.JwtRefreshGuard),
    (0, common_1.Post)('refreshtoken'),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "createAndAttachRefreshToken", null);
__decorate([
    (0, common_1.Post)('accesstoken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "createAccessToken", null);
__decorate([
    (0, common_2.UseGuards)(jwt_guards_1.JwtRefreshGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "refreshAccessToken", null);
exports.TokensController = TokensController = __decorate([
    (0, common_1.Controller)('Token'),
    __metadata("design:paramtypes", [tokens_service_1.TokensService,
        jwt_1.JwtService])
], TokensController);
//# sourceMappingURL=tokens.controller.js.map
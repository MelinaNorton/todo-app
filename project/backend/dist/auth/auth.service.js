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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const user_service_1 = require("../users/user.service");
const common_2 = require("@nestjs/common");
const tokens_service_1 = require("../tokens/tokens.service");
const bcrypt_service_1 = require("./providers/bcrypt.service");
const common_3 = require("@nestjs/common");
let AuthService = class AuthService {
    tokensService;
    bcryptService;
    userService;
    constructor(tokensService, bcryptService, userService) {
        this.tokensService = tokensService;
        this.bcryptService = bcryptService;
        this.userService = userService;
    }
    async signup(createAuthDto) {
        const user = await this.userService.create(createAuthDto);
    }
    async validate(loginAuthDto) {
        const username = loginAuthDto.username;
        console.log("Ran before findOne");
        const exists = await this.userService.findOne({ username });
        if (!exists) {
            throw new common_2.UnauthorizedException('Invalid Username');
        }
        console.log("Ran before bcrypt");
        const match = this.bcryptService.comparePasswords(loginAuthDto.password, exists.password);
        if (!match) {
            throw new common_2.UnauthorizedException('Invalid Password');
        }
        return exists;
    }
    async login(loginAuthoDto, res, req) {
        const exists = await this.validate(loginAuthoDto);
        const existing = req.cookies['refreshtoken'];
        if (existing) {
            this.tokensService.validateRefreshToken(existing);
            this.tokensService.revokeRefreshToken(existing.jti);
        }
        const newRefreshToken = await this.tokensService.createToken(exists);
        console.log("Refresh Token Created in login service: ", newRefreshToken);
        this.tokensService.attatchToken(newRefreshToken, res);
        const newAccessToken = await this.tokensService.createAccessToken({ sub: exists._id, username: exists.username });
        console.log("Access Token Created in login service: ", newAccessToken);
        return { token: newRefreshToken, accesstoken: newAccessToken };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(1, (0, common_3.Res)({ passthrough: true })),
    __param(2, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.Login, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tokens_service_1.TokensService,
        bcrypt_service_1.BcryptService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
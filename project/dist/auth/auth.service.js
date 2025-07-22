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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var login_dto_1 = require("./dto/login.dto");
var user_service_1 = require("../users/user.service");
var common_2 = require("@nestjs/common");
var tokens_service_1 = require("../tokens/tokens.service");
var bcrypt_service_1 = require("./providers/bcrypt.service");
var common_3 = require("@nestjs/common");
var AuthService = (function () {
    function AuthService(tokensService, bcryptService, userService) {
        this.tokensService = tokensService;
        this.bcryptService = bcryptService;
        this.userService = userService;
    }
    AuthService.prototype.signup = function (createAuthDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.userService.create(createAuthDto)];
            });
        });
    };
    AuthService.prototype.validate = function (loginAuthDto) {
        return __awaiter(this, void 0, void 0, function () {
            var username, exists, match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = loginAuthDto.username;
                        console.log("Ran before findOne");
                        return [4, this.userService.findOne({ username: username })];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throw new common_2.UnauthorizedException('Invalid Username');
                        }
                        console.log("Ran before bcrypt");
                        match = this.bcryptService.comparePasswords(loginAuthDto.password, exists.password);
                        if (!match) {
                            throw new common_2.UnauthorizedException('Invalid Password');
                        }
                        return [2, exists];
                }
            });
        });
    };
    AuthService.prototype.login = function (loginAuthoDto, res, req) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, existing, newRefreshToken, newAccessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.validate(loginAuthoDto)];
                    case 1:
                        exists = _a.sent();
                        existing = req.cookies['refreshtoken'];
                        if (existing) {
                            this.tokensService.validateRefreshToken(existing);
                            this.tokensService.revokeRefreshToken(existing.jti);
                        }
                        return [4, this.tokensService.createToken(exists)];
                    case 2:
                        newRefreshToken = _a.sent();
                        console.log("Refresh Token Created in login service: ", newRefreshToken);
                        this.tokensService.attatchToken(newRefreshToken, res);
                        return [4, this.tokensService.createAccessToken({ sub: exists._id, username: exists.username })];
                    case 3:
                        newAccessToken = _a.sent();
                        console.log("Access Token Created in login service: ", newAccessToken);
                        return [2, { token: newRefreshToken, accesstoken: newAccessToken }];
                }
            });
        });
    };
    __decorate([
        __param(1, (0, common_3.Res)({ passthrough: true })),
        __param(2, (0, common_3.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [login_dto_1.Login, Object, Object]),
        __metadata("design:returntype", Promise)
    ], AuthService.prototype, "login");
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [tokens_service_1.TokensService,
            bcrypt_service_1.BcryptService,
            user_service_1.UserService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
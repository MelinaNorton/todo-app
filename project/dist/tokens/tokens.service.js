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
exports.TokensService = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var common_2 = require("@nestjs/common");
var crypto_1 = require("crypto");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var common_3 = require("@nestjs/common");
var TokensService = (function () {
    function TokensService(jwtService, configService, tokensModel) {
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
    TokensService.prototype.create = function (createTokenDto) {
        return __awaiter(this, void 0, void 0, function () {
            var newToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newToken = new this.tokensModel(createTokenDto);
                        return [4, newToken.save()];
                    case 1:
                        _a.sent();
                        return [2, newToken];
                }
            });
        });
    };
    TokensService.prototype.createToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var jti, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jti = (0, crypto_1.randomUUID)();
                        console.log(this.refreshsecret);
                        return [4, this.jwtService.sign({ sub: user._id, username: user.username, type: "refresh", jti: jti }, {
                                secret: this.refreshsecret,
                                expiresIn: this.refreshexpiry
                            })];
                    case 1:
                        token = _a.sent();
                        return [2, token];
                }
            });
        });
    };
    TokensService.prototype.createAccessToken = function (_a) {
        var sub = _a.sub, username = _a.username;
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.jwtService.sign({ sub: sub, username: username, type: "access" }, {
                            secret: this.accesssecret,
                            expiresIn: this.accessexpiry
                        })];
                    case 1:
                        token = _b.sent();
                        return [2, token];
                }
            });
        });
    };
    TokensService.prototype.attatchToken = function (token, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.cookie(this.refreshtokenname, token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 3600 * 1000,
                    path: '/'
                });
                return [2, true];
            });
        });
    };
    TokensService.prototype.detatchToken = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("RAN!");
                res.clearCookie(this.refreshtokenname, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/'
                });
                return [2, true];
            });
        });
    };
    TokensService.prototype.validateRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.jwtService.verifyAsync(token, { secret: this.refreshsecret })];
                    case 1:
                        decodedToken = _a.sent();
                        if (decodedToken.type != "refresh") {
                            throw new common_3.UnauthorizedException("Attempted to use an access token as a refresh token");
                        }
                        return [2, token];
                }
            });
        });
    };
    TokensService.prototype.validateAccessToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.jwtService.verifyAsync(token, { secret: this.refreshsecret })];
                    case 1:
                        decodedToken = _a.sent();
                        return [2, token];
                }
            });
        });
    };
    TokensService.prototype.revokeRefreshToken = function (jti) {
        return __awaiter(this, void 0, void 0, function () {
            var revoked;
            return __generator(this, function (_a) {
                revoked = this.tokensModel.findOneAndDelete({ jti: jti });
                return [2, jti];
            });
        });
    };
    TokensService.prototype.findOne = function (jti) {
        return __awaiter(this, void 0, void 0, function () {
            var found;
            return __generator(this, function (_a) {
                found = this.tokensModel.findOne({ jti: jti });
                if (!found) {
                    throw new common_1.NotFoundException("Refresh Token Missing or Revoked");
                }
                return [2, true];
            });
        });
    };
    __decorate([
        __param(0, (0, common_2.Res)({ passthrough: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TokensService.prototype, "detatchToken");
    TokensService = __decorate([
        (0, common_1.Injectable)(),
        __param(2, (0, mongoose_1.InjectModel)('Token')),
        __metadata("design:paramtypes", [jwt_1.JwtService,
            config_1.ConfigService,
            mongoose_2.Model])
    ], TokensService);
    return TokensService;
}());
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_refreshStrategy_1 = require("./strategies/jwt.refreshStrategy");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const tokens_controller_1 = require("./tokens.controller");
const tokens_service_1 = require("./tokens.service");
const mongoose_1 = require("@nestjs/mongoose");
const tokens_schema_1 = require("./schema/tokens.schema");
const config_2 = require("@nestjs/config");
const jwt_guards_1 = require("./guards/jwt.guards");
let TokensModule = class TokensModule {
};
exports.TokensModule = TokensModule;
exports.TokensModule = TokensModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_REFRESH_SECRET'),
                    signOptions: { expiresIn: config.get('JWT_REFRESH_EXPIRES') },
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: "Token", schema: tokens_schema_1.tokenSchema }]),
        ],
        controllers: [tokens_controller_1.TokensController],
        providers: [tokens_service_1.TokensService, jwt_refreshStrategy_1.JwtRefreshStrategy, jwt_guards_1.JwtRefreshGuard],
        exports: [tokens_service_1.TokensService]
    })
], TokensModule);
//# sourceMappingURL=tokens.module.js.map
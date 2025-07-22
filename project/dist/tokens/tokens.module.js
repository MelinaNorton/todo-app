"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokensModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_refreshStrategy_1 = require("./strategies/jwt.refreshStrategy");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var config_1 = require("@nestjs/config");
var tokens_controller_1 = require("./tokens.controller");
var tokens_service_1 = require("./tokens.service");
var mongoose_1 = require("@nestjs/mongoose");
var tokens_schema_1 = require("./schema/tokens.schema");
var config_2 = require("@nestjs/config");
var jwt_guards_1 = require("./guards/jwt.guards");
var TokensModule = (function () {
    function TokensModule() {
    }
    TokensModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_2.ConfigModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.registerAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (config) { return ({
                        secret: config.get('JWT_REFRESH_SECRET'),
                        signOptions: { expiresIn: config.get('JWT_REFRESH_EXPIRES') }
                    }); }
                }),
                mongoose_1.MongooseModule.forFeature([{ name: "Token", schema: tokens_schema_1.tokenSchema }]),
            ],
            controllers: [tokens_controller_1.TokensController],
            providers: [tokens_service_1.TokensService, jwt_refreshStrategy_1.JwtRefreshStrategy, jwt_guards_1.JwtRefreshGuard],
            exports: [tokens_service_1.TokensService]
        })
    ], TokensModule);
    return TokensModule;
}());
exports.TokensModule = TokensModule;
//# sourceMappingURL=tokens.module.js.map
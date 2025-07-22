"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var mongoose_1 = require("@nestjs/mongoose");
var user_module_1 = require("./users/user.module");
var passport_1 = require("@nestjs/passport");
var auth_module_1 = require("./auth/auth.module");
var list_module_1 = require("./list/list.module");
var serve_static_1 = require("@nestjs/serve-static");
var path_1 = require("path");
var tokens_module_1 = require("./tokens/tokens.module");
var config_1 = require("@nestjs/config");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                    serveRoot: '/uploads'
                }),
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: 'app.env'
                }),
                mongoose_1.MongooseModule.forRoot('mongodb+srv://linamelina0707:gfnmEAPfyM3BlMMJ@cluster0.gqer0il.mongodb.net/ToDoDB?retryWrites=true&w=majority'),
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                list_module_1.ListModule,
                tokens_module_1.TokensModule
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
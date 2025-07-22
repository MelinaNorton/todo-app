"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListModule = void 0;
var common_1 = require("@nestjs/common");
var list_service_1 = require("./list.service");
var list_controller_1 = require("./list.controller");
var mongoose_1 = require("@nestjs/mongoose");
var list_schema_1 = require("./schema/list.schema");
var user_service_1 = require("../users/user.service");
var user_module_1 = require("../users/user.module");
var users_schema_1 = require("../users/schema/users.schema");
var bcrypt_service_1 = require("../auth/providers/bcrypt.service");
var auth_module_1 = require("../auth/auth.module");
var ListModule = (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: "List", schema: list_schema_1.ListSchema }]),
                user_module_1.UserModule,
                mongoose_1.MongooseModule.forFeature([{ name: "User", schema: users_schema_1.userSchema }]),
                auth_module_1.AuthModule
            ],
            controllers: [list_controller_1.ListController],
            providers: [list_service_1.ListService, user_service_1.UserService, bcrypt_service_1.BcryptService]
        })
    ], ListModule);
    return ListModule;
}());
exports.ListModule = ListModule;
//# sourceMappingURL=list.module.js.map
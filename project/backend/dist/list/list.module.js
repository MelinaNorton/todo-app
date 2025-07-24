"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModule = void 0;
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
const list_controller_1 = require("./list.controller");
const mongoose_1 = require("@nestjs/mongoose");
const list_schema_1 = require("./schema/list.schema");
const user_service_1 = require("../users/user.service");
const user_module_1 = require("../users/user.module");
const users_schema_1 = require("../users/schema/users.schema");
const bcrypt_service_1 = require("../auth/providers/bcrypt.service");
let ListModule = class ListModule {
};
exports.ListModule = ListModule;
exports.ListModule = ListModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "List", schema: list_schema_1.ListSchema }]),
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([{ name: "User", schema: users_schema_1.userSchema }]),
        ],
        controllers: [list_controller_1.ListController],
        providers: [list_service_1.ListService, user_service_1.UserService, bcrypt_service_1.BcryptService],
    })
], ListModule);
//# sourceMappingURL=list.module.js.map
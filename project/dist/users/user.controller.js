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
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var user_service_1 = require("./user.service");
var create_user_dto_1 = require("./dto/create-user.dto");
var update_user_dto_1 = require("./dto/update-user.dto");
var filter_user_dto_1 = require("./dto/filter-user.dto");
var jwt_authguard_1 = require("../auth/guards/jwt.authguard");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var path_1 = require("path");
var passport_1 = require("@nestjs/passport");
var common_2 = require("@nestjs/common");
var UsersController = (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.usersService.create(createUserDto)];
                    case 1:
                        user = _a.sent();
                        return [2, user];
                }
            });
        });
    };
    UsersController.prototype.upload = function (req, _id, file, update) {
        return __awaiter(this, void 0, void 0, function () {
            var imgFile;
            return __generator(this, function (_a) {
                console.log(file);
                imgFile = "/uploads/".concat(file.filename);
                console.log("Cookie id extracted in upload controller: ", req.user.sub);
                return [2, this.usersService.upload(req.user.sub, imgFile, update)];
            });
        });
    };
    UsersController.prototype.findAll = function (req, item_id) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = { _id: req.user.sub };
                        console.log("Query from findAll user controller: ", query);
                        return [4, this.usersService.findAll(query)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.update = function (req, query, updateUserDto) {
        query._id = req.user.sub;
        return this.usersService.update(query, updateUserDto);
    };
    UsersController.prototype.remove = function (query) {
        return this.usersService.remove(query);
    };
    var _a, _b;
    __decorate([
        (0, common_1.HttpCode)(201),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "create");
    __decorate([
        (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
            storage: (0, multer_1.diskStorage)({
                destination: function (req, file, cb) {
                    var uploadPath = (0, path_1.join)(process.cwd(), 'uploads');
                    cb(null, uploadPath);
                },
                filename: function (_req, file, cb) {
                    var suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    var extension = file.originalname.split(".").pop();
                    cb(null, "".concat('profile', "-").concat(suffix, ".").concat(extension));
                }
            }),
            fileFilter: function (_req, file, cb) {
                if (!file.mimetype.startsWith("image/")) {
                    return cb(new common_1.BadRequestException("Wrong File Type"), false);
                }
                cb(null, true);
            }
        })),
        (0, common_1.Patch)('image'),
        __param(0, (0, common_2.Request)()),
        __param(1, (0, common_1.Query)('_id')),
        __param(2, (0, common_1.UploadedFile)()),
        __param(3, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String, typeof (_b = typeof express_1.Express !== "undefined" && (_a = express_1.Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, update_user_dto_1.UpdateUserDto]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "upload");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
        (0, common_1.Get)('get'),
        __param(0, (0, common_2.Request)()),
        __param(1, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], UsersController.prototype, "findAll");
    __decorate([
        (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard),
        (0, common_1.Patch)('patch'),
        __param(0, (0, common_2.Request)()),
        __param(1, (0, common_1.Query)()),
        __param(2, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, filter_user_dto_1.FilterUserDto, update_user_dto_1.UpdateUserDto]),
        __metadata("design:returntype", void 0)
    ], UsersController.prototype, "update");
    __decorate([
        (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard),
        (0, common_1.Delete)('delete'),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto]),
        __metadata("design:returntype", void 0)
    ], UsersController.prototype, "remove");
    UsersController = __decorate([
        (0, common_1.Controller)('User'),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map
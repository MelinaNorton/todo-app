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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const filter_user_dto_1 = require("./dto/filter-user.dto");
const jwt_authguard_1 = require("../auth/guards/jwt.authguard");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const common_2 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        return {
            folder: 'profiles',
            format: file.mimetype.split('/')[1],
            public_id: `profile_${Date.now()}`,
        };
    }
});
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        const user = await this.usersService.create(createUserDto);
        return user;
    }
    async upload(req, file, update) {
        const imgUrl = file.path;
        return this.usersService.upload(req.user.sub, imgUrl, update);
    }
    async findAll(req, item_id) {
        const query = { _id: req.user.sub };
        return await this.usersService.findAll(query);
    }
    update(req, query, updateUserDto) {
        query._id = req.user.sub;
        return this.usersService.update(query, updateUserDto);
    }
    remove(query) {
        return this.usersService.remove(query);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: cloudStorage,
        fileFilter: (_req, file, cb) => {
            if (!file.mimetype.startsWith("image/")) {
                return cb(new common_1.BadRequestException("Wrong File Type"), false);
            }
            cb(null, true);
        }
    })),
    (0, common_1.Patch)('image'),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "upload", null);
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard, (0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('get'),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard),
    (0, common_1.Patch)('patch'),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_user_dto_1.FilterUserDto, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_authguard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_user_dto_1.FilterUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UsersController);
//# sourceMappingURL=user.controller.js.map
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_service_1 = require("../auth/providers/bcrypt.service");
let UserService = class UserService {
    usersModel;
    bcryptService;
    constructor(usersModel, bcryptService) {
        this.usersModel = usersModel;
        this.bcryptService = bcryptService;
    }
    async create(createUserDto) {
        const securepass = await this.bcryptService.hashPass(createUserDto.password);
        const newUser = new this.usersModel({
            ...createUserDto,
            password: securepass
        });
        await newUser.save();
        return newUser;
    }
    async upload(sub, imgFile, update) {
        const port = parseInt(process.env.PORT ?? '3000', 10);
        const url = "http://localhost:" + port + imgFile;
        const updated = {
            ...update,
            image: url,
        };
        const changed = await this.usersModel.findOneAndUpdate({ _id: sub }, { $set: updated }, { new: true });
        if (!changed) {
            throw new common_1.NotFoundException("Image did NOT upload :(");
        }
        return changed;
    }
    async findAll(filter) {
        const defined_fields = {};
        if (filter.firstname != undefined) {
            defined_fields.firstname = filter.firstname;
        }
        if (filter.username != undefined) {
            defined_fields.username = filter.username;
        }
        if (filter.lastname != undefined) {
            defined_fields.lastname = filter.lastname;
        }
        if (filter.email != undefined) {
            defined_fields.email = filter.email;
        }
        if (filter._id != undefined) {
            defined_fields._id = filter._id;
        }
        return this.usersModel.find(defined_fields).exec();
    }
    async findOne(query) {
        const filter = {};
        if (query._id) {
            filter['_id'] = query._id;
        }
        if (query.username) {
            filter['username'] = query.username;
        }
        if (query.firstname) {
            filter['firstname'] = query.firstname;
        }
        if (query.lastname) {
            filter['lastname'] = query.lastname;
        }
        if (query.email != undefined) {
            filter['email'] = query.email;
        }
        const found = await this.usersModel.findOne(filter);
        if (found) {
            return found;
        }
        else {
            throw new common_1.UnauthorizedException("No User Found");
        }
    }
    async update(query, updateUserDto) {
        const filter = {};
        if (query._id) {
            filter['_id'] = query._id;
        }
        if (query.username) {
            filter['username'] = query.username;
        }
        return this.usersModel.findOneAndUpdate(filter, updateUserDto, { new: true });
    }
    async remove(query) {
        const filter = {};
        if (query._id) {
            filter['_id'] = query._id;
        }
        if (query.username) {
            filter['username'] = query.username;
        }
        return this.usersModel.findOneAndDelete(filter);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bcrypt_service_1.BcryptService])
], UserService);
//# sourceMappingURL=user.service.js.map
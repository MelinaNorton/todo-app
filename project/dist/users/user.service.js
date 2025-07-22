"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var bcrypt_service_1 = require("../auth/providers/bcrypt.service");
var UserService = (function () {
    function UserService(usersModel, bcryptService) {
        this.usersModel = usersModel;
        this.bcryptService = bcryptService;
    }
    UserService.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var securepass, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.bcryptService.hashPass(createUserDto.password)];
                    case 1:
                        securepass = _a.sent();
                        newUser = new this.usersModel(__assign(__assign({}, createUserDto), { password: securepass }));
                        return [4, newUser.save()];
                    case 2:
                        _a.sent();
                        return [2, newUser];
                }
            });
        });
    };
    UserService.prototype.upload = function (sub, imgFile, update) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var port, url, updated, changed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000', 10);
                        url = "http://localhost:" + port + imgFile;
                        updated = __assign(__assign({}, update), { image: url });
                        console.log("Update To Be: ", updated);
                        console.log("image URL: ", url);
                        return [4, this.usersModel.findOneAndUpdate({ _id: sub }, { $set: updated }, { "new": true })];
                    case 1:
                        changed = _b.sent();
                        if (!changed) {
                            throw new common_1.NotFoundException("Image did NOT upload :(");
                        }
                        return [2, changed];
                }
            });
        });
    };
    UserService.prototype.findAll = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var defined_fields;
            return __generator(this, function (_a) {
                defined_fields = {};
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
                console.log("Param Filter: ", filter);
                console.log("Defined Fields: ", defined_fields);
                return [2, this.usersModel.find(defined_fields).exec()];
            });
        });
    };
    UserService.prototype.findOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = {};
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
                        return [4, this.usersModel.findOne(filter)];
                    case 1:
                        found = _a.sent();
                        if (found) {
                            return [2, found];
                        }
                        else {
                            throw new common_1.UnauthorizedException("No User Found");
                        }
                        return [2];
                }
            });
        });
    };
    UserService.prototype.update = function (query, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var filter;
            return __generator(this, function (_a) {
                console.log(updateUserDto);
                filter = {};
                if (query._id) {
                    filter['_id'] = query._id;
                }
                if (query.username) {
                    filter['username'] = query.username;
                }
                return [2, this.usersModel.findOneAndUpdate(filter, updateUserDto, { "new": true })];
            });
        });
    };
    UserService.prototype.remove = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var filter;
            return __generator(this, function (_a) {
                filter = {};
                if (query._id) {
                    filter['_id'] = query._id;
                }
                if (query.username) {
                    filter['username'] = query.username;
                }
                return [2, this.usersModel.findOneAndDelete(filter)];
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)('User')),
        __metadata("design:paramtypes", [mongoose_2.Model,
            bcrypt_service_1.BcryptService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
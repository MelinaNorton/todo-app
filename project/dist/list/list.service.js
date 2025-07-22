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
exports.ListService = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var user_service_1 = require("../users/user.service");
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var mongoose_2 = require("mongoose");
var ListService = (function () {
    function ListService(userService, userModel, listModel) {
        this.userService = userService;
        this.userModel = userModel;
        this.listModel = listModel;
    }
    ListService.prototype.create = function (createListDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.listModel.create(createListDto)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ListService.prototype.validateUser = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.userService.findOne({ _id: user_id })];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throw new common_1.NotFoundException("The target User of the operation was not found");
                        }
                        return [2, exists];
                }
            });
        });
    };
    ListService.prototype.getItem = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, item_id, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.validateUser(filter.user_id)];
                    case 1:
                        _a.sent();
                        user_id = filter.user_id, item_id = filter.item_id;
                        return [4, this.listModel.findOne({ user_id: user_id, 'list._id': item_id }, { 'list.$': 1 }).exec()];
                    case 2:
                        found = _a.sent();
                        if (!found) {
                            throw new common_1.NotFoundException("List Item not Found on User");
                        }
                        return [2, found.list[0]];
                }
            });
        });
    };
    ListService.prototype.getItems = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.validateUser(filter.user_id)];
                    case 1:
                        _a.sent();
                        user_id = filter.user_id;
                        return [4, this.listModel.findOne({ user_id: user_id }).exec()];
                    case 2:
                        found = _a.sent();
                        if (!found) {
                            throw new common_1.NotFoundException("No Lust found associated with User");
                        }
                        return [2, found.list];
                }
            });
        });
    };
    ListService.prototype.updateItem = function (filter, update) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, item_id, setItemOps, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.validateUser(filter.user_id)];
                    case 1:
                        _a.sent();
                        user_id = filter.user_id, item_id = filter.item_id;
                        setItemOps = {};
                        if (update.text != undefined) {
                            setItemOps['list.$.text'] = update.text;
                        }
                        if (update.done != undefined) {
                            setItemOps['list.$.done'] = update.done;
                        }
                        return [4, this.listModel.findOneAndUpdate({ user_id: user_id, 'list._id': item_id }, { $set: setItemOps }, { "new": true }).exec()];
                    case 2:
                        updated = _a.sent();
                        if (!updated) {
                            throw new common_1.NotFoundException('List item not found for this user');
                        }
                        return [2, updated];
                }
            });
        });
    };
    ListService.prototype.deleteItem = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, item_id, deleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.validateUser(filter.user_id)];
                    case 1:
                        _a.sent();
                        user_id = filter.user_id, item_id = filter.item_id;
                        return [4, this.listModel.findOneAndUpdate({ user_id: user_id }, { $pull: { list: { _id: item_id } } }, { "new": true }).exec()];
                    case 2:
                        deleted = _a.sent();
                        if (!deleted) {
                            throw new common_1.NotFoundException("List item not found on this user");
                        }
                        return [2, deleted];
                }
            });
        });
    };
    ListService.prototype.addItem = function (filter, createToDo) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var update, user_id, created;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.validateUser(filter.user_id)];
                    case 1:
                        _b.sent();
                        update = { $push: { list: createToDo } };
                        user_id = filter.user_id;
                        return [4, this.listModel.findOneAndUpdate({ user_id: user_id }, update, { "new": true, projection: { list: { $slice: -1 } } }).exec()];
                    case 2:
                        created = _b.sent();
                        console.log(created);
                        if (!((_a = created === null || created === void 0 ? void 0 : created.list) === null || _a === void 0 ? void 0 : _a.length)) {
                            throw new common_1.NotFoundException("User for update not found");
                        }
                        return [2, created.list[0]];
                }
            });
        });
    };
    ListService = __decorate([
        (0, common_2.Injectable)(),
        __param(1, (0, mongoose_1.InjectModel)('User')),
        __param(2, (0, mongoose_1.InjectModel)('List')),
        __metadata("design:paramtypes", [user_service_1.UserService,
            mongoose_2.Model,
            mongoose_2.Model])
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map
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
exports.ListController = void 0;
var common_1 = require("@nestjs/common");
var list_service_1 = require("./list.service");
var common_2 = require("@nestjs/common");
var filtertodolist_dto_1 = require("./dto/filtertodolist.dto");
var update_todolistdto_1 = require("./dto/update-todolistdto");
var create_todoitem_dto_1 = require("./dto/create-todoitem.dto");
var user_service_1 = require("../users/user.service");
var create_list_dto_1 = require("./dto/create-list.dto");
var passport_1 = require("@nestjs/passport");
var common_3 = require("@nestjs/common");
var ListController = (function () {
    function ListController(listService, userService) {
        this.listService = listService;
        this.userService = userService;
    }
    ListController.prototype.create = function (createListDto) {
        return this.listService.create(createListDto);
    };
    ListController.prototype.findItem = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.listService.getItem(filter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ListController.prototype.findItems = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { user_id: req.user.sub };
                        console.log("Filter from findItems: ", filter);
                        return [4, this.listService.getItems(filter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ListController.prototype.updateItem = function (req, filter, update) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter.user_id = req.user.sub;
                        return [4, this.listService.updateItem(filter, update)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ListController.prototype.deleteItem = function (req, filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter.user_id = req.user.sub;
                        return [4, this.listService.deleteItem(filter)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ListController.prototype.addItem = function (req, filter, createTodo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter.user_id = req.user.sub;
                        return [4, this.listService.addItem(filter, createTodo)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    __decorate([
        (0, common_2.Post)(),
        __param(0, (0, common_2.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [create_list_dto_1.CreateListDto]),
        __metadata("design:returntype", void 0)
    ], ListController.prototype, "create");
    __decorate([
        (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
        (0, common_2.Get)('item'),
        __param(0, (0, common_2.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [filtertodolist_dto_1.FilterToDoListDto]),
        __metadata("design:returntype", Promise)
    ], ListController.prototype, "findItem");
    __decorate([
        (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
        (0, common_2.Get)('items'),
        __param(0, (0, common_3.Request)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ListController.prototype, "findItems");
    __decorate([
        (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
        (0, common_2.Patch)('item'),
        __param(0, (0, common_3.Request)()),
        __param(1, (0, common_2.Query)()),
        __param(2, (0, common_2.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, filtertodolist_dto_1.FilterToDoListDto, update_todolistdto_1.UpdateToDoItemDto]),
        __metadata("design:returntype", Promise)
    ], ListController.prototype, "updateItem");
    __decorate([
        (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
        (0, common_2.Delete)('item'),
        __param(0, (0, common_3.Request)()),
        __param(1, (0, common_2.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, filtertodolist_dto_1.FilterToDoListDto]),
        __metadata("design:returntype", Promise)
    ], ListController.prototype, "deleteItem");
    __decorate([
        (0, common_2.HttpCode)(201),
        (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
        (0, common_2.Post)('item'),
        __param(0, (0, common_3.Request)()),
        __param(1, (0, common_2.Query)()),
        __param(2, (0, common_2.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, filtertodolist_dto_1.FilterToDoListDto, create_todoitem_dto_1.CreateToDoItemDto]),
        __metadata("design:returntype", Promise)
    ], ListController.prototype, "addItem");
    ListController = __decorate([
        (0, common_1.Controller)('list'),
        __metadata("design:paramtypes", [list_service_1.ListService,
            user_service_1.UserService])
    ], ListController);
    return ListController;
}());
exports.ListController = ListController;
//# sourceMappingURL=list.controller.js.map
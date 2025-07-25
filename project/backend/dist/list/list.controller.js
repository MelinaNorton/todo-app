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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
const common_2 = require("@nestjs/common");
const filtertodolist_dto_1 = require("./dto/filtertodolist.dto");
const update_todolistdto_1 = require("./dto/update-todolistdto");
const create_todoitem_dto_1 = require("./dto/create-todoitem.dto");
const user_service_1 = require("../users/user.service");
const create_list_dto_1 = require("./dto/create-list.dto");
const passport_1 = require("@nestjs/passport");
const common_3 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
let ListController = class ListController {
    listService;
    userService;
    constructor(listService, userService) {
        this.listService = listService;
        this.userService = userService;
    }
    create(createListDto) {
        return this.listService.create(createListDto);
    }
    async findItem(filter) {
        return await this.listService.getItem(filter);
    }
    async findItems(req) {
        const filter = { user_id: req.user.sub };
        return await this.listService.getItems(filter);
    }
    async updateItem(req, filter, update) {
        filter.user_id = req.user.sub;
        return await this.listService.updateItem(filter, update);
    }
    async deleteItem(req, filter) {
        filter.user_id = req.user.sub;
        return await this.listService.deleteItem(filter);
    }
    async addItem(req, filter, createTodo) {
        filter.user_id = req.user.sub;
        return await this.listService.addItem(filter, createTodo);
    }
};
exports.ListController = ListController;
__decorate([
    (0, common_2.Post)(),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_list_dto_1.CreateListDto]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "create", null);
__decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_2.Get)('item'),
    __param(0, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filtertodolist_dto_1.FilterToDoListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "findItem", null);
__decorate([
    (0, common_2.UseGuards)(throttler_1.ThrottlerGuard, (0, passport_1.AuthGuard)('jwt')),
    (0, common_2.Get)('items'),
    __param(0, (0, common_3.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "findItems", null);
__decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_2.Patch)('item'),
    __param(0, (0, common_3.Request)()),
    __param(1, (0, common_2.Query)()),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtertodolist_dto_1.FilterToDoListDto, update_todolistdto_1.UpdateToDoItemDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "updateItem", null);
__decorate([
    (0, common_2.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_2.Delete)('item'),
    __param(0, (0, common_3.Request)()),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filtertodolist_dto_1.FilterToDoListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "deleteItem", null);
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
], ListController.prototype, "addItem", null);
exports.ListController = ListController = __decorate([
    (0, common_1.Controller)('list'),
    __metadata("design:paramtypes", [list_service_1.ListService,
        user_service_1.UserService])
], ListController);
//# sourceMappingURL=list.controller.js.map
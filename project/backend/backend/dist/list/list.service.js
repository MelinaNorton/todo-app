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
exports.ListService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("../users/user.service");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
let ListService = class ListService {
    userService;
    userModel;
    listModel;
    constructor(userService, userModel, listModel) {
        this.userService = userService;
        this.userModel = userModel;
        this.listModel = listModel;
    }
    async create(createListDto) {
        return await this.listModel.create(createListDto);
    }
    async validateUser(user_id) {
        const exists = await this.userService.findOne({ _id: user_id });
        if (!exists) {
            throw new common_1.NotFoundException("The target User of the operation was not found");
        }
        return exists;
    }
    async getItem(filter) {
        await this.validateUser(filter.user_id);
        const { user_id, item_id } = filter;
        const found = await this.listModel.findOne({ user_id: user_id, 'list._id': item_id }, { 'list.$': 1 }).exec();
        if (!found) {
            throw new common_1.NotFoundException("List Item not Found on User");
        }
        return found.list[0];
    }
    async getItems(filter) {
        await this.validateUser(filter.user_id);
        const user_id = filter.user_id;
        const found = await this.listModel.findOne({ user_id: user_id }).exec();
        if (!found) {
            throw new common_1.NotFoundException("No Lust found associated with User");
        }
        return found.list;
    }
    async updateItem(filter, update) {
        await this.validateUser(filter.user_id);
        const { user_id, item_id } = filter;
        const setItemOps = {};
        if (update.text != undefined) {
            setItemOps['list.$.text'] = update.text;
        }
        if (update.done != undefined) {
            setItemOps['list.$.done'] = update.done;
        }
        const updated = await this.listModel.findOneAndUpdate({ user_id: user_id, 'list._id': item_id }, { $set: setItemOps }, { new: true }).exec();
        if (!updated) {
            throw new common_1.NotFoundException('List item not found for this user');
        }
        return updated;
    }
    async deleteItem(filter) {
        await this.validateUser(filter.user_id);
        const { user_id, item_id } = filter;
        const deleted = await this.listModel.findOneAndUpdate({ user_id: user_id }, { $pull: { list: { _id: item_id } } }, { new: true }).exec();
        if (!deleted) {
            throw new common_1.NotFoundException("List item not found on this user");
        }
        return deleted;
    }
    async addItem(filter, createToDo) {
        await this.validateUser(filter.user_id);
        const update = { $push: { list: createToDo } };
        const user_id = filter.user_id;
        const created = await this.listModel.findOneAndUpdate({ user_id: user_id }, update, { new: true, projection: { list: { $slice: -1 } } }).exec();
        console.log(created);
        if (!created?.list?.length) {
            throw new common_1.NotFoundException("User for update not found");
        }
        return created.list[0];
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_2.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('List')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model,
        mongoose_2.Model])
], ListService);
//# sourceMappingURL=list.service.js.map
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ToDo } from "./interface/todoitem.interface";
import { User } from "src/users/interface/user.interface";
import { UserService } from "src/users/user.service";
import { CreateToDoItemDto } from "./dto/create-todoitem.dto";
import { UpdateToDoItemDto } from "./dto/update-todolistdto";
import { Model } from "mongoose";
import { FilterToDoListDto } from "./dto/filtertodolist.dto";
import { List } from "./interface/list.interface";
import { CreateListDto } from "./dto/create-list.dto";
export declare class ListService {
    private readonly userService;
    private readonly userModel;
    private readonly listModel;
    constructor(userService: UserService, userModel: Model<User>, listModel: Model<List>);
    create(createListDto: CreateListDto): Promise<import("mongoose").Document<unknown, {}, List, {}> & List & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    validateUser(user_id: string): Promise<User>;
    getItem(filter: FilterToDoListDto): Promise<ToDo>;
    getItems(filter: FilterToDoListDto): Promise<ToDo[]>;
    updateItem(filter: FilterToDoListDto, update: UpdateToDoItemDto): Promise<import("mongoose").Document<unknown, {}, List, {}> & List & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteItem(filter: FilterToDoListDto): Promise<import("mongoose").Document<unknown, {}, List, {}> & List & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    addItem(filter: FilterToDoListDto, createToDo: CreateToDoItemDto): Promise<ToDo>;
}

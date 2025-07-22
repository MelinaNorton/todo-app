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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ListService } from './list.service';
import { FilterToDoListDto } from './dto/filtertodolist.dto';
import { UpdateToDoItemDto } from './dto/update-todolistdto';
import { CreateToDoItemDto } from './dto/create-todoitem.dto';
import { UserService } from 'src/users/user.service';
import { CreateListDto } from './dto/create-list.dto';
export declare class ListController {
    private readonly listService;
    private readonly userService;
    constructor(listService: ListService, userService: UserService);
    create(createListDto: CreateListDto): Promise<import("mongoose").Document<unknown, {}, import("./interface/list.interface").List, {}> & import("./interface/list.interface").List & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findItem(filter: FilterToDoListDto): Promise<import("./interface/todoitem.interface").ToDo>;
    findItems(req: any): Promise<import("./interface/todoitem.interface").ToDo[]>;
    updateItem(req: any, filter: FilterToDoListDto, update: UpdateToDoItemDto): Promise<import("mongoose").Document<unknown, {}, import("./interface/list.interface").List, {}> & import("./interface/list.interface").List & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteItem(req: any, filter: FilterToDoListDto): Promise<import("mongoose").Document<unknown, {}, import("./interface/list.interface").List, {}> & import("./interface/list.interface").List & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    addItem(req: any, filter: FilterToDoListDto, createTodo: CreateToDoItemDto): Promise<import("./interface/todoitem.interface").ToDo>;
}

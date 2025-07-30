import { ToDo } from "./interface/todoitem.interface";
import { User } from "src/users/interface/user.interface";
import { UserService } from "src/users/user.service";
import { CreateToDoItemDto } from "./dto/create-todoitem.dto";
import { UpdateToDoItemDto } from "./dto/update-todolistdto";
import { Model } from "mongoose";
import { FilterToDoListDto } from "./dto/filtertodolist.dto";
import { List } from "./interface/list.interface";
import { CreateListDto } from "./dto/create-list.dto";
import Redis from 'ioredis';
export declare class ListService {
    private readonly userService;
    private readonly userModel;
    private readonly listModel;
    private redis;
    constructor(userService: UserService, userModel: Model<User>, listModel: Model<List>, redis: Redis);
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

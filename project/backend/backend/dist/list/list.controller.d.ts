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

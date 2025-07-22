import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./interface/user.interface").User>;
    upload(req: any, _id: string, file: Express.Multer.File, update: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./interface/user.interface").User, {}> & import("./interface/user.interface").User & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    findAll(req: any, item_id: string): Promise<import("./interface/user.interface").User[]>;
    update(req: any, query: FilterUserDto, updateUserDto: UpdateUserDto): Promise<(import("mongoose").Document<unknown, {}, import("./interface/user.interface").User, {}> & import("./interface/user.interface").User & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    remove(query: FilterUserDto): Promise<(import("mongoose").Document<unknown, {}, import("./interface/user.interface").User, {}> & import("./interface/user.interface").User & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}

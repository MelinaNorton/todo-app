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

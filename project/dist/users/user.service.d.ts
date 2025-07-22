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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { FilterUserDto } from './dto/filter-user.dto';
import { BcryptService } from 'src/auth/providers/bcrypt.service';
export declare class UserService {
    private readonly usersModel;
    private bcryptService;
    constructor(usersModel: Model<User>, bcryptService: BcryptService);
    create(createUserDto: CreateUserDto): Promise<User>;
    upload(sub: string, imgFile: string, update: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    findAll(filter: FilterUserDto): Promise<User[]>;
    findOne(query: FilterUserDto): Promise<User>;
    update(query: FilterUserDto, updateUserDto: UpdateUserDto): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    remove(query: FilterUserDto): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}

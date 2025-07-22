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

import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    email?: string;
    image?: string;
}
export {};

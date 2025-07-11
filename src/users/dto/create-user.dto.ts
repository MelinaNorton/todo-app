import { IsString, IsArray, IsOptional } from 'class-validator';
import { CreateToDoItemDto } from '../../list/dto/create-todoitem.dto';
import { ToDo } from "../../list/interface/todoitem.interface";
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstname : string

    @IsString()
    lastname : string
    
    @IsString()
    username : string

    @IsString()
    password : string

    @IsString()
    email :string

    @IsOptional()
    @IsString()
    image? :string
}

import { IsString, IsArray, IsOptional } from 'class-validator';
import { CreateToDoItemDto } from '../todolist/dtos/create-todoitem.dto';
import { ToDo } from "../todolist/interfaces/todoitem.interface";
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

    @IsArray()
    @Type(() => CreateToDoItemDto) 
    @ValidateNested({ each: true })
    items : CreateToDoItemDto[]

    @IsString()
    email :string
}

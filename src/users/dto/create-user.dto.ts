import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";
import { ToDo } from "users/interface/todoitem.interface";

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
    items : Array<ToDo>

    @IsString()
    email :string
}

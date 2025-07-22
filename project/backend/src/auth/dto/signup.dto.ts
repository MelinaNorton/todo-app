import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";
import { ToDo } from "src/list/interface/todoitem.interface";
import { TodoItemSchema } from "src/list/schema/listitems.schema";

export class Signup {
    @IsString()
    username : string

    @IsString()
    firstname : string

    @IsString()
    lastname : string

    @IsString()
    password : string

    @IsString()
    email : string

    @IsArray()
    items : Array<ToDo>
}

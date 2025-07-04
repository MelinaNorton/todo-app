import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray, ValidateNested} from "@nestjs/class-validator";
import { FilterToDoItemDto } from "../todolist/dtos/filtertodolist.dto";
import { Type } from "class-transformer";

export class FilterUserDto {
    @IsOptional()
    @IsString()
    firstname? : string

    @IsOptional()
    @IsString()
    lastname? : string
    
    @IsOptional()
    @IsString()
    username? : string

    @IsOptional()
    @IsString()
    password? : string

    @IsOptional()
    @IsString()
    email? :string

    @IsOptional()
    @IsString()
    _id? :string

    @ValidateNested({ each: true })
    @Type(() => FilterToDoItemDto)
    items?: FilterToDoItemDto[];
}
import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray, ValidateNested} from "class-validator";
import { FilterToDoItemDto } from "../../list/dto/filtertodoitem.dto";
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
    _id? :any

    /*@ValidateNested({ each: true })
    @Type(() => FilterToDoItemDto)
    items?: FilterToDoItemDto[];*/
}
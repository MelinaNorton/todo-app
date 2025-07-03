import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";
export class FilterToDoItemDto{

    @IsBoolean()
    @IsOptional()
    done? : boolean

    @IsString()
    @IsOptional()
    id? : string

    @IsString()
    @IsOptional()
    text? : string

    @IsString()
    _id : string

    @IsString()
    @IsOptional()
    username? : string
}
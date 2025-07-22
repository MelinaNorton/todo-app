import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";

export class FilterToDoItemDto {
    @IsString()
    @IsOptional()
    text? : string

    @IsBoolean()
    @IsOptional()
    done? : boolean

    @IsString()
    @IsOptional()
    id? : string
}
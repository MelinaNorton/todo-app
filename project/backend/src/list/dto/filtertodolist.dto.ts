import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";

export class FilterToDoListDto {
    @IsString()
    user_id : string

    @IsString()
    @IsOptional()
    item_id? : string
}
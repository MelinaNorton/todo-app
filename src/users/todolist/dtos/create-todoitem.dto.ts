import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";

export class CreateToDoItemDto {
    @IsString()
    @IsOptional()
    text : string

    @IsBoolean()
    @IsOptional()
    done : boolean
}
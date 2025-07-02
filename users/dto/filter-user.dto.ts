import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";
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
    @IsArray()
    items? : Array<string>

    @IsOptional()
    @IsString()
    email? :string
}
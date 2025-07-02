import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";
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
    items : Array<string>

    @IsString()
    email :string
}

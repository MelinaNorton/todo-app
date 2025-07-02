import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "@nestjs/class-validator";

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
    items : Array<string>
}

import {IsString, IsInt, IsBoolean, Min, Max, IsOptional, IsArray} from "class-validator";

export class Login {
    @IsString()
    username : string

    @IsString()
    password : string
}

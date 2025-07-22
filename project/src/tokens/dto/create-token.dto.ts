import { IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateToDoItemDto } from '../../list/dto/create-todoitem.dto';
import { ToDo } from "../../list/interface/todoitem.interface";
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateTokenDto {
    @IsString()         
    jti!: string;

    @IsString()         
    sub!: string;

    @Transform(({ value }) => Number(value))
    @IsNumber()         
    iat?: number;
    
    @Transform(({ value }) => Number(value))
    @IsNumber()         
    exp?: number;

    @IsString()         
    username!: string;
}

import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsOptional, IsString } from 'class-validator';
import { CreateToDoItemDto } from './create-todoitem.dto';

export class CreateListDto {
    @IsArray()
    @ValidateNested()
    @IsOptional()
    list : CreateToDoItemDto[]

    @IsString()
    @IsOptional()
    user_id : string
}
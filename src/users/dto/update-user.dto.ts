import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateToDoItemDto } from '../../list/dto/create-todoitem.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    /*@IsOptional()
    @IsArray()
    @Type(() => CreateToDoItemDto)
    @ValidateNested({ each: true })
    items?: CreateToDoItemDto[];*/

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
    @IsString()
    email? :string

    @IsOptional()
    @IsString()
    image?: string
}

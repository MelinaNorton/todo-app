import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoItemDto } from './create-todoitem.dto';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateToDoItemDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
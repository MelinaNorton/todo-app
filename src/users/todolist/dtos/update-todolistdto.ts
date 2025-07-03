import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoItemDto } from './create-todoitem.dto';

export class UpdateToDoItemDto extends PartialType(CreateToDoItemDto) {}
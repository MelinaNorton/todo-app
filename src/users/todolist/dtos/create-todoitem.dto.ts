import { IsString, IsBoolean } from 'class-validator';

export class CreateToDoItemDto {
    @IsString()
    text : string

    @IsBoolean()
    done : boolean
}
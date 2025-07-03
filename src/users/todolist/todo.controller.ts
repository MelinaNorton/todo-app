import { Controller } from "@nestjs/common";
import { FilterToDoItemDto } from "./dtos/filter-todolistitem.dto";
import { FilterUserDto } from "../dto/filter-user.dto";
import { Query, Get } from "@nestjs/common";
import { ToDoListService } from "./todolist.service";
@Controller('todolist')
export class ToDoController {
    constructor(
        private readonly toDoListService: ToDoListService,
    ) {}
    @Get('item')
    async findAll(listQuery:FilterToDoItemDto){
        return await this.toDoListService.getItem(listQuery)
    }
}
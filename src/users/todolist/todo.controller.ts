import { Controller } from "@nestjs/common";
import { FilterUserDto } from "../dto/filter-user.dto";
import { Query, Get } from "@nestjs/common";
import { ToDoListService } from "./todolist.service";
@Controller('todolist')
export class ToDoController {
    constructor(
        private readonly toDoListService: ToDoListService,
    ) {}

    @Get('item')
    async findItems( @Query('_id') filter:FilterUserDto, @Query('item_id') item_id:string){
        return await this.toDoListService.getItem({ _id: filter._id }, item_id)
    }
}
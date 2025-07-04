import { Controller } from "@nestjs/common";
import { FilterUserDto } from "../dto/filter-user.dto";
import { Query, Get, Patch, Body, Delete , Post} from "@nestjs/common";
import { ToDoListService } from "./todolist.service";
import { UpdateToDoItemDto } from "./dtos/update-todolistdto";
import { CreateToDoItemDto } from "./dtos/create-todoitem.dto";

@Controller('todolist')
export class ToDoController {
    constructor(
        private readonly toDoListService: ToDoListService,
    ) {}

    @Get('item')
    async findItem( @Query('_id') filter:FilterUserDto, @Query('item_id') item_id:string){
        return await this.toDoListService.getItem({ _id: filter._id }, item_id)
    }

    @Get('items')
    async findItems(@Query('_id') filter:FilterUserDto){
        return await this.toDoListService.getItems({_id : filter._id})
    }

    @Patch('item')
    async updateItem(@Query() filter:FilterUserDto, @Query('item_id') item_id:string, @Body() update: UpdateToDoItemDto){
        return await this.toDoListService.updateItem({_id : filter._id}, item_id, update)
    }

    @Delete('item')
    async deleteItem(@Query() filter:FilterUserDto, @Query('item_id') item_id:string){
        return await this.toDoListService.deleteItem(filter, item_id)
    }

    @Post('item')
    async addItem(@Query() filter:FilterUserDto, @Body() createTodo : CreateToDoItemDto){
        return await this.toDoListService.addItem(filter, createTodo)
    }
}
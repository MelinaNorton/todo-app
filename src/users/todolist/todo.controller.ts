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

//connects to the getItem() function within the service using the DTO & the item_id as a query; this is important because
//grabbing our filter via DTO, regardless if we know the field we expect, applies our safety-nets & middleware, and alos
//performs helpful checks concerning the DB & _id's
    @Get('item')
    async findItem( @Query('_id') filter:FilterUserDto, @Query('item_id') item_id:string){
        return await this.toDoListService.getItem({ _id: filter._id }, item_id)
    }

//uses the same logic as above to grab multiple items, omitting the granularity of item_id to do so
    @Get('items')
    async findItems(@Query('_id') filter:FilterUserDto){
        return await this.toDoListService.getItems({_id : filter._id})
    }

//performs a patch on the item specified in the manner of getItem() using the fields defined in updateToDoItemDto
    @Patch('item')
    async updateItem(@Query() filter:FilterUserDto, @Query('item_id') item_id:string, @Body() update: UpdateToDoItemDto){
        return await this.toDoListService.updateItem({_id : filter._id}, item_id, update)
    }

//deletes the item as found by the filterUserDto->> item_id
    @Delete('item')
    async deleteItem(@Query() filter:FilterUserDto, @Query('item_id') item_id:string){
        return await this.toDoListService.deleteItem(filter, item_id)
    }

//adds a new item to the User found via the FilterUserDto, using the data within CreateToDoItemDto to accomplish this
    @Post('item')
    async addItem(@Query() filter:FilterUserDto, @Body() createTodo : CreateToDoItemDto){
        return await this.toDoListService.addItem(filter, createTodo)
    }
}
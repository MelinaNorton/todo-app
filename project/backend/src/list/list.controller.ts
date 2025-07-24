import { Controller } from '@nestjs/common';
import { ListService } from './list.service';
import { Query, Get, Patch, Body, Delete , Post, UseGuards, HttpCode} from "@nestjs/common";
import { FilterToDoListDto } from './dto/filtertodolist.dto';
import { UpdateToDoItemDto } from './dto/update-todolistdto';
import { CreateToDoItemDto } from './dto/create-todoitem.dto';
import { UserService } from 'src/users/user.service';
import { CreateListDto } from './dto/create-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';

@Controller('list')
export class ListController {
    constructor(
        private readonly listService: ListService,
        private readonly userService: UserService
    ) {}

    @Post()
    create(@Body() createListDto: CreateListDto) {
      return this.listService.create(createListDto);
    }
//takes user_id & item_id from filter -> passes it to the service, which 1) finds the user via userService then 2) grabs the
//associated list and 3) returns the requested item_id-item
    @UseGuards(AuthGuard('jwt'))
    @Get('item')
    async findItem(@Query() filter: FilterToDoListDto){
        return await this.listService.getItem(filter)
    }

//takes user_id from the filter -> passes it to teh service, which 1) finds the user via userService & returns the list
//w/the matching user_id
    @UseGuards(AuthGuard('jwt'))
    @Get('items')
    async findItems(@Request() req){
        const filter = {user_id:req.user.sub}
        console.log("Filter from findItems: ", filter)
        return await this.listService.getItems(filter)
    }

//takes user_id & item_id from filter -> passes it ti the service, which 1) finds the user via userService & 2) finds-and-updates
//the item on the list w/ the matching user_id
    @UseGuards(AuthGuard('jwt'))
    @Patch('item')
    async updateItem(@Request() req, @Query() filter:FilterToDoListDto, @Body() update: UpdateToDoItemDto){
        console.log("Hit beginning of list-update endpoint")
        filter.user_id = req.user.sub
        return await this.listService.updateItem(filter, update)
    }

//takes user_id & item_id -> passes it to the service, which 1) finds the user via userService & 2) finds the items[] associated
//with that user & then finds-and-deletes the item with the matching item_id
    @UseGuards(AuthGuard('jwt'))
    @Delete('item')
    async deleteItem(@Request() req, @Query() filter:FilterToDoListDto){
        filter.user_id = req.user.sub
        return await this.listService.deleteItem(filter)
    }

//takes user_id & the data & 1) finds the user via user_id & 2)finds the list with the associated user_id and adds the new data
    @HttpCode(201)
    @UseGuards(AuthGuard('jwt'))
    @Post('item')
    async addItem(@Request() req, @Query() filter:FilterToDoListDto, @Body() createTodo : CreateToDoItemDto){
        filter.user_id = req.user.sub
        return await this.listService.addItem(filter, createTodo)
    }
}

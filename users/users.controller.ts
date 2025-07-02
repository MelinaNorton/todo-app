import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //get all items- includes empty contingency, since query == {} returns all docs, as well as specific-
  // no need for separate routes
  @Get('get')
  findAll(@Query() query:FilterUserDto) {
    return this.usersService.findAll(query);
  }

  @Patch('patch')
  update(@Query() query:FilterUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(query,updateUserDto)
  }

  @Delete('delete')
  remove(@Query() query:FilterUserDto) {
    return this.usersService.remove(query)
  }
}

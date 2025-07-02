import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtAuthGuard } from 'auth/jwt.authguard';

@Controller('User')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //get all items- includes empty contingency, since query == {} returns all docs, as well as specific-
  // no need for separate routes
  @UseGuards(JwtAuthGuard)
  @Get('get')
  findAll(@Query() query:FilterUserDto) {
    return this.usersService.findAll(query);
  }

  //patch any contingency- multiple changes, one, or none (uses findOne, so only changes 1)
  @UseGuards(JwtAuthGuard)
  @Patch('patch')
  update(@Query() query:FilterUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(query,updateUserDto)
  }

  //delete any user (uses findOne, so only changes 1)
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  remove(@Query() query:FilterUserDto) {
    return this.usersService.remove(query)
  }
}

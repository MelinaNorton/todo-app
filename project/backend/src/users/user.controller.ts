import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Res, Req, UseInterceptors, BadRequestException, UploadedFile, HttpCode} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.authguard';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from 'path';
import { Express } from 'express';
import { ListService } from 'src/list/list.service';
import { CreateListDto } from 'src/list/dto/create-list.dto';
import { ToDo } from 'src/list/interface/todoitem.interface';
import { Inject } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';

@Controller('User')
export class UsersController {
  constructor(
    private readonly usersService: UserService,
  ) {}

//creates a new user using the appropriate dto
    @HttpCode(201)
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      const user = await this.usersService.create(createUserDto);
      /*const dummyList = {list:[], user_id:user._id}
      const list = this.listService.create(dummyList)*/
      return user
    }

//not as complicated as it looks- initializes the UseInterceptors decorator with our desired config (choosing filename,)
//directory, filetyepe & download location, then takes in multipart-formdata & the user's id to download the given File ->
// the /uploads file & serves it statically from there
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads');
        cb(null, uploadPath);
      },
        filename: (_req, file, cb) => {
          const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split(".").pop();
          cb(null,`${'profile'}-${suffix}.${extension}`)
        },
      }),
      fileFilter: (_req, file, cb) => {
        if(!file.mimetype.startsWith("image/")){
        return cb(new BadRequestException("Wrong File Type"), false);
      }
      cb(null, true);
    }
  })
)
@Patch('image')
async upload(@Request() req, @UploadedFile() file:Express.Multer.File, @Body() update: UpdateUserDto){
  console.log(file)
  const imgFile = `/uploads/${file.filename}`;
  console.log("Cookie id extracted in upload controller: ", req.user.sub)
  return this.usersService.upload(req.user.sub, imgFile, update);
}
//get all items- includes empty contingency, since query == {} returns all docs, as well as specific-
// no need for separate routes
    @UseGuards(AuthGuard('jwt'))
    @Get('get')
    async findAll(@Request() req, @Query() item_id:string) {
      const query = {_id:req.user.sub}
      console.log("Query from findAll user controller: ", query)
      return await this.usersService.findAll(query);
    }
    
//patch any contingency- multiple changes, one, or none (uses findOne, so only changes 1)
    @UseGuards(JwtAuthGuard)
    @Patch('patch')
    update(@Request() req, @Query() query:FilterUserDto, @Body() updateUserDto: UpdateUserDto) {
      query._id = req.user.sub
      return this.usersService.update(query,updateUserDto)
    }

//delete any user (uses findOne, so only changes 1)
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  remove(@Query() query:FilterUserDto) {
    return this.usersService.remove(query)
  }
}

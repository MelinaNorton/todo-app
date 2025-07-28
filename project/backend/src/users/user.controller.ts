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
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'profiles',
      format: file.mimetype.split('/')[1],
      public_id: `profile_${Date.now()}`,
    };
  }
})


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
      storage: cloudStorage,
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
  const imgUrl = file.path 
  return this.usersService.upload(req.user.sub, imgUrl, update);
}
//get all items- includes empty contingency, since query == {} returns all docs, as well as specific-
// no need for separate routes

    @UseGuards(ThrottlerGuard, AuthGuard('jwt'))
    @Get('get')
    async findAll(@Request() req, @Query() item_id:string) {
      const query = {_id:req.user.sub}
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

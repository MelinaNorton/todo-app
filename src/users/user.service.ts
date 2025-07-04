import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { User } from './interface/user.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FilterUserDto } from './dto/filter-user.dto';
import { BcryptService } from 'src/auth/providers/bcrypt.service';
import { FilterQuery, ProjectionType } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') 
    private readonly usersModel: Model <User>, 
    private bcryptService:BcryptService
  ){}

    async create(createUserDto: CreateUserDto):Promise<User> {
      const securepass = await this.bcryptService.hashPass(createUserDto.password)
      const newUser = new this.usersModel({
        ...createUserDto,
        password : securepass
      })
      await newUser.save()
      return newUser
    }

  async findAll(filter : FilterUserDto, projection?: ProjectionType<User>): Promise<User[]> {
    const defined_fields:FilterUserDto = {}
    if(filter.firstname != undefined){defined_fields.firstname = filter.firstname}
    if(filter.username != undefined){defined_fields.username = filter.username}
    if(filter.lastname != undefined){defined_fields.lastname = filter.lastname}
    if(filter.email != undefined){defined_fields.email = filter.email}
    if(filter.items != undefined){defined_fields.items = filter.items}
    return this.usersModel.find(defined_fields, projection).exec();
  }

  async findOne(query : FilterUserDto): Promise<User> {
    const found = await this.usersModel.findOne(query)
    if(found){
      return found
    }
    else{
      throw new UnauthorizedException("No User Found")
    }
  }

  async update(query : FilterUserDto, updateUserDto: UpdateUserDto) {
    return this.usersModel.findOneAndUpdate(query, updateUserDto, {new : true})
  }

  async remove(query: FilterUserDto) {
    return this.usersModel.findOneAndDelete(query)
  }
}

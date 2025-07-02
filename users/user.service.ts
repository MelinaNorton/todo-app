import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { User } from './interface/user.interface';
import { JwtStrategy } from 'auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') 
    private readonly usersModel: Model <User>, 
    private jwtService: JwtService, 
    private configService: ConfigService
  ){}

    async create(createUserDto: CreateUserDto):Promise<User> {
      require('bcrypt')
      const salt = await bcrypt.genSalt(10);
      const securepass = await bcrypt.hash(createUserDto.password, salt)
      const newUser = new this.usersModel({
        ...createUserDto,
        password : securepass
      })
      await newUser.save()
      return newUser
    }

  async findAll(filter : FilterUserDto): Promise<User[]> {
    const defined_fields:FilterUserDto = {}
    if(filter.username != undefined){defined_fields.firstname = filter.username}
    if(filter.lastname != undefined){defined_fields.lastname = filter.lastname}
    if(filter.email != undefined){defined_fields.email = filter.email}
    if(filter.items != undefined){defined_fields.items = filter.items}
    return this.usersModel.find(defined_fields).exec();
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
    return this,this.usersModel.findOneAndDelete(query)
  }
}

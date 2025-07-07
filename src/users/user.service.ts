import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import { FilterUserDto } from './dto/filter-user.dto';
import { BcryptService } from 'src/auth/providers/bcrypt.service';

@Injectable()
export class UserService {

//defines a User-model that is injectable within the file & decorates it appropriately 
//also defines a helper-service from the BcryptService to modularize actions taken using bcrypt
  constructor(
    @InjectModel('User') 
    private readonly usersModel: Model <User>, 
    private bcryptService:BcryptService
  ){}

//function called to carry out the logic of the "create" function; hashes the desired password via bcryptService &
//replaces the "password" field of createUserDto with the new value & saves
  async create(createUserDto: CreateUserDto):Promise<User> {
    const securepass = await this.bcryptService.hashPass(createUserDto.password)
    const newUser = new this.usersModel({
      ...createUserDto,
      password : securepass
    })

//note the use of save() here; this function is used to run validation w/the schema, apply insertOne logic to the 
//creation logic, add a new _id in Mongodb (should the document be found to not exist), apply any middleware save & return    
    await newUser.save()
    return newUser
  }

//takes in a FilterUserDto, and uses the defined fields to call the MongooseModel's function, find(). Should no field
//be populated, find() will be called with no arguments & all documents will be returned
  async findAll(filter : FilterUserDto): Promise<User[]> {
    const defined_fields:FilterUserDto = {}
    if(filter.firstname != undefined){defined_fields.firstname = filter.firstname}
    if(filter.username != undefined){defined_fields.username = filter.username}
    if(filter.lastname != undefined){defined_fields.lastname = filter.lastname}
    if(filter.email != undefined){defined_fields.email = filter.email}
    return this.usersModel.find(defined_fields).exec();
  }

  //follows the same logic as obove, but calls the MongooseModel's function findOne to return just the first-found document
  //matching the description
  async findOne(query : FilterUserDto): Promise<User> {
    const filter = {}
    if(query._id){filter['_id'] = query._id}
    if(query.username){filter['username'] = query.username}
    if(query.firstname){filter['firstname'] = query.firstname}
    if(query.lastname){filter['lastname'] = query.lastname}
    if(query.email != undefined){filter['email'] = query.email}
    const found = await this.usersModel.findOne(filter)
    if(found){
      return found
    }
    else{
      throw new UnauthorizedException("No User Found")
    }
  }

//uses a query to zero-in on the iser to be updated, and updates the document using the defined fields of updateUserDto
//by simply calling findOneAndUpdate() with the variable
  async update(query : FilterUserDto, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    const filter = {}
    if(query._id){filter['_id'] = query._id}
    if(query.username){filter['username'] = query.username}
    return this.usersModel.findOneAndUpdate(filter, updateUserDto, {new : true})
  }

  //removes the specfied user using a FilterUserDto & calling findOneAndDelete with the variable
  async remove(query: FilterUserDto) {
    const filter = {}
    if(query._id){filter['_id'] = query._id}
    if(query.username){filter['username'] = query.username}
    return this.usersModel.findOneAndDelete(filter)
  }
}

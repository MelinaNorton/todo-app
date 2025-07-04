import { ToDo } from "../todolist/interfaces/todoitem.interface"
import { Model } from "mongoose";
import { User } from "../interface/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from "../user.service";
import { FilterUserDto } from "../dto/filter-user.dto";
import { NotFoundException } from "@nestjs/common";
import { CreateToDoItemDto } from "./dtos/create-todoitem.dto";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class ToDoListService {
    constructor(
        private readonly userService : UserService
    ){}

    //get an item by id
    async getItem(filter : FilterUserDto, item_id : string):Promise<ToDo>{
       const listFilter:FilterUserDto = {"_id":filter._id}
        if (item_id) {
            listFilter['items._id'] = item_id;
        }
       const user = await this.userService.findAll(
        listFilter,
        )
        if(!user){
            throw new NotFoundException("List Item Does Not Exist")
        }
        //this line made me suffer; TLDR: do not forget to add the query names to @Query() decorators!
        const found = user[0].items.find(i => i._id.toHexString() === String(item_id).trim())
        if(found){
            return found
        }
        throw new NotFoundException("No Item Found")
    }

    //get all items by username/firstname/etc
    /*async getItems(filterUserDto:FilterUserDto):Promise<ToDo[]>{
        const user = await this.usersModel.findOne(filterUserDto)
        if(!user){
            throw new NotFoundException("User with this list does not exist")
        }
        return user.items
    }*/

    //add one item
    /*async addItem(filterUserDto:FilterUserDto, createToDoItemDto:CreateToDoItemDto):Promise<ToDo>{
        const user = await this.usersModel.findOneAndUpdate(
        filterUserDto,
        { $push: { items: createToDoItemDto } },
        { new: true, projection: { 'items.$': 1 } }
        )
        if(!user){
            throw new NotFoundException("List Item Does Not Exist")
        }
        return user.items[0]
    }*/
    //delete one itel by id
    //delete all items done==false
}
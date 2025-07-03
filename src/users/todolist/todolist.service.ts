import { FilterToDoItemDto } from "./dtos/filter-todolistitem.dto";
import { ToDo } from "../todolist/interfaces/todoitem.interface"
import { Model } from "mongoose";
import { User } from "../interface/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from "../user.service";
import { FilterUserDto } from "../dto/filter-user.dto";
import { NotFoundException } from "@nestjs/common";
import { CreateToDoItemDto } from "./dtos/create-todoitem.dto";

export class ToDoListService {
    constructor(
        @InjectModel('ToDoList')
        private readonly usersModel: Model <User>
    ){}

    //get an item by id
    async getItem(filterToDoListItem : FilterToDoItemDto):Promise<ToDo>{
       const listFilter:FilterToDoItemDto = {"_id":filterToDoListItem._id}
       if(filterToDoListItem.id != undefined){listFilter['items.id'] = filterToDoListItem.id}
       if(filterToDoListItem.text != undefined){listFilter['items.text'] = filterToDoListItem.text}
       const user = await this.usersModel.findOne(
        listFilter,
        {'items.$': 1}
        )
        if(!user){
            throw new NotFoundException("List Item Does Not Exist")
        }
        return user.items[0]
    }

    //get all items by username/firstname/etc
    async getItems(filterUserDto:FilterUserDto):Promise<ToDo[]>{
        const user = await this.usersModel.findOne(filterUserDto)
        if(!user){
            throw new NotFoundException("User with this list does not exist")
        }
        return user.items
    }

    //add one item
    async addItem(filterUserDto:FilterUserDto, createToDoItemDto:CreateToDoItemDto):Promise<ToDo>{
        const user = await this.usersModel.findOneAndUpdate(
        filterUserDto,
        { $push: { items: createToDoItemDto } },
        { new: true, projection: { 'items.$': 1 } }
        )
        if(!user){
            throw new NotFoundException("List Item Does Not Exist")
        }
        return user.items[0]
    }
    //delete one itel by id
    //delete all items done==false
}
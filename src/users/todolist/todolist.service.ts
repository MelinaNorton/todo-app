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
import { UpdateToDoItemDto } from "./dtos/update-todolistdto";

@Injectable()
export class ToDoListService {
    constructor(
        private readonly userService : UserService,
        @InjectModel('User')   
        private readonly userModel : Model<User>
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
    async getItems(filterUserDto:FilterUserDto):Promise<ToDo[]>{
        const user = await this.userService.findOne(filterUserDto)
        if(!user){
            throw new NotFoundException("User with this list does not exist")
        }
        return user[0].items
    }

    //add one item
    async updateItem(filterUserDto:FilterUserDto, item_id : string, update: UpdateToDoItemDto){
        const filter = {_id : filterUserDto, 'items._id': item_id}
        const setItemOps: Record<string,any> = {}
        //use positional operator to zero-in on the item grabbed by the user_id->item_id->
        if(update.text != undefined){setItemOps['items.$.text'] = update.text}
        if(update.done != undefined){setItemOps['items.$.done'] = update.done}

        console.log('Incoming DTO:', update);
        console.log('Computed $set:', setItemOps);

        //remember- whne using the positional operator, you cannot return the new documently as simply as before;
        // you need to call elemMatch to grab it after the change
        const user = await this.userModel.findOneAndUpdate(
            filter,
            {$set : setItemOps},
            {
                new: true,
                projection: {
                    items: { $elemMatch: { _id: item_id } }
                } 
            }
        ).exec()
        
        console.log(user)

        if(user == null || !user.items?.length){
            throw new NotFoundException('Item does not exist')
        }
        return user
    }
    //delete one itel by id
    async deleteItem(filterUserDto:FilterUserDto, item_id : string){
        const filter = {_id : filterUserDto, 'items._id': item_id}

        const deleted = await this.userModel.findOne(
            filter,
            { $pull: { items: { _id: item_id } } }
        ).exec()

        if(!deleted){
            throw new NotFoundException("Item or User not found for deletion")
        }
        return deleted
    }
    //delete all items done==false
}
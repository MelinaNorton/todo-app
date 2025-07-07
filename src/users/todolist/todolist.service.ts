import { ToDo } from "../todolist/interfaces/todoitem.interface"
import { Model } from "mongoose";
import { User } from "../interface/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from "../user.service";
import { FilterUserDto } from "../dto/filter-user.dto";
import { NotFoundException } from "@nestjs/common";
import { CreateToDoItemDto } from "./dtos/create-todoitem.dto";
import { Injectable } from "@nestjs/common";
import { UpdateToDoItemDto } from "./dtos/update-todolistdto";

@Injectable()
export class ToDoListService {
    constructor(
        private readonly userService : UserService,
        @InjectModel('User')   
        private readonly userModel : Model<User>
    ){}

//get an item by the Usr's _d -> item_id
    async getItem(filter : FilterUserDto, item_id : string):Promise<ToDo>{
//populate the filter with necessary fields, performing existence-checks as safety measure
       const listFilter:FilterUserDto = {"_id":filter._id}
        if (item_id) {
            listFilter['items._id'] = item_id;
        }

//await the response of the MongooseModel's findAll, (called with our filter) so that user has a value upon success & 
// doesnt perform any more actions before being populated
       const user = await this.userService.findAll(
        listFilter,
        )

//handle not-found contingency
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
//await the findOne return called with (filterUserDto)
        const user = await this.userService.findOne(filterUserDto)
        if(!user){
            throw new NotFoundException("User with this list does not exist")
        }
//return the user @ the first index of our array of Users's items
        return user[0].items
    }

//update one item
    async updateItem(filterUserDto:FilterUserDto, item_id : string, update: UpdateToDoItemDto){
//populate our filter
        const filter = {_id : filterUserDto, 'items._id': item_id}

//define the operations we wish to applu to our item-to-be-updatedm to be passed to findOneAndUpdate
//use positional operator to zero-in on the item grabbed by the user_id->item_id->
        const setItemOps: Record<string,any> = {}
        if(update.text != undefined){setItemOps['items.$.text'] = update.text}
        if(update.done != undefined){setItemOps['items.$.done'] = update.done}

//remember- when using the positional operator, you cannot return the new documently as simply as before;
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

//perform existence-check & return
        if(user == null || !user.items?.length){
            throw new NotFoundException('Item does not exist')
        }
        return user
    }

//delete one item by id
    async deleteItem(filterUserDto:FilterUserDto, item_id : string){
//populate our filter
        const filter = {_id : filterUserDto._id}

//await the response of the MongooseModel's updateOne called with our filter & operation-specification 
// (necessary for manipulating embedded docs, as opposed to the probably-expected delete())
        const deleted = await this.userModel.updateOne(
            filter,
            { $pull: { items: { _id: item_id } } } 
        ).exec()

//check if we got the deleted doc as a response & return
        if(!deleted){
            throw new NotFoundException("Item or User not found for deletion")
        }
        return deleted
    }

//add new item
    async addItem(filterUserDto:FilterUserDto, createToDo : CreateToDoItemDto){
//populate our filter & define the opertation we wish to apply
        const filter = {_id : filterUserDto._id}
        const update = {$push : { items: createToDo }}

//await the response of MongooseModel's fineOneAndUpdate, called with oir filter & operation
//note: the return simply specifies to return the NEW, updated value(s), and to grab the very last item
        const created = await this.userModel.findOneAndUpdate(
            filter,
            update,
            {new : true, projection: { items: { $slice: -1 }}}
        ).exec()

//check that we got a response for our fineOneAndUpdate call & return
        if(!created?.items?.length){
            throw new NotFoundException("User for update not found")
        }
        return created
    }
}
import { ToDo } from "./interface/todoitem.interface";
import { User } from "src/users/interface/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from "src/users/user.service";
import { NotFoundException } from "@nestjs/common";
import { CreateToDoItemDto } from "./dto/create-todoitem.dto";
import { Injectable } from "@nestjs/common";
import { UpdateToDoItemDto } from "./dto/update-todolistdto";
import { Model } from "mongoose";
import { FilterToDoListDto } from "./dto/filtertodolist.dto";
import { List } from "./interface/list.interface";
import { CreateListDto } from "./dto/create-list.dto";
import Redis from 'ioredis';
import { Inject } from "@nestjs/common";

@Injectable()
export class ListService {
    constructor(
        private readonly userService : UserService,
        @InjectModel('User')  
        private readonly userModel : Model<User>,
        @InjectModel('List') 
            private readonly listModel: Model <List>,
        @Inject('REDIS_CLIENT') private redis: Redis
    ){}

    async create(createListDto:CreateListDto){
        return await this.listModel.create(createListDto)
    }
    async validateUser(user_id:string):Promise<User>{
        const exists = await this.userService.findOne({_id: user_id})
        if(!exists){
            throw new NotFoundException("The target User of the operation was not found")
        }
        return exists
    }

    async getItem(filter : FilterToDoListDto):Promise<ToDo>{
        //make sure the user exists before the operation
        await this.validateUser(filter.user_id)

        //grab ids for the find() function below
        const {user_id, item_id} = filter

        //find the List with the given item_id included
        const found = await this.listModel.findOne(
            {user_id:user_id, 'list._id':item_id},
            {'list.$': 1}
        ).exec()

        if(!found){
            throw new NotFoundException("List Item not Found on User")
        }
        return found.list[0]
    }


    async getItems(filter:FilterToDoListDto):Promise<ToDo[]>{
        //make sure user exists before the operation
        await this.validateUser(filter.user_id)

        //extract the user_id for the find() operation below
        const user_id = filter.user_id

        //check redis cache
        const cacheKey = `list:${user_id}`;
        const cached = await this.redis.get(cacheKey);

        if (cached) {
            return JSON.parse(cached); // Return cached list
        }

        //find the list with the given user_id
        const found = await this.listModel.findOne({ user_id }, { list: 1, _id: 0 }).lean();

        if(!found){
             throw new NotFoundException("No Lust found associated with User")
        }

        //log result -> cache
        await this.redis.set(cacheKey, JSON.stringify(found.list), 'EX', 300); // Cache for 300s

        //return the list[] associated with the returned List object
        return found.list
    }

    async updateItem(filter:FilterToDoListDto, update: UpdateToDoItemDto){
        //make sure the user exists before the operation
        await this.validateUser(filter.user_id)

        //extract the id-data for use in the find/update operations below
        const {user_id, item_id} = filter

        //define the desired changes t be made to the item's fields via update's fields
        const setItemOps: Record<string,any> = {}
        if(update.text != undefined){setItemOps['list.$.text'] = update.text}
        if(update.done != undefined){setItemOps['list.$.done'] = update.done}

        //find the list.item associated w/the user and $set that item -> our update & return the new doc
        const updated = await this.listModel.findOneAndUpdate(
            {user_id:user_id, 'list._id' : item_id},
            {$set : setItemOps},
            {new:true}
        ).exec()

        if(!updated){
            throw new NotFoundException('List item not found for this user');
        }

        //invalidate cache
        await this.redis.del(`list:${user_id}`);
        
        //return the new item
        return updated 
    }

    async deleteItem(filter:FilterToDoListDto){
        //make sure the user exists before the operation
        await this.validateUser(filter.user_id)

        //extract the id-data for use in the find/update operations below
        const {user_id, item_id} = filter

        //find the desired list/item via the id data & delete
        const deleted = await this.listModel.findOneAndUpdate(
            {user_id:user_id},
            {$pull: { list: { _id: item_id } }},
            {new:true}
        ).exec()

        if(!deleted){
            throw new NotFoundException("List item not found on this user")
        }

        //handle cache
        await this.redis.del(`list:${user_id}`);

        //return the doc
        return deleted
    }

    async addItem(filter:FilterToDoListDto, createToDo : CreateToDoItemDto){
        //make sure the user exists before the operation
        await this.validateUser(filter.user_id)

        //define the desired update & associated push-action
        const update = {$push : { list: createToDo }}

        //extract user_id for findOneAndUpdate() function below
        const user_id = filter.user_id

        //find the associated list & apply the push-update & return
        const created = await this.listModel.findOneAndUpdate(
            {user_id:user_id},
            update,
            {new : true, projection: { list: { $slice: -1 }}}
        ).exec()
        if(!created?.list?.length){
            throw new NotFoundException("User for update not found")
        }

        //handle cache
        const fullList = await this.listModel.findOne({ user_id }, { list: 1, _id: 0 }).lean();
        await this.redis.set(`list:${user_id}`, JSON.stringify(fullList?.list), 'EX', 300);

        //return the new doc
        return created.list[0]
    }
}
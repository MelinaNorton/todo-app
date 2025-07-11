import { Schema } from 'mongoose'
import { TodoItemSchema } from '../../list/schema/listitems.schema'

export const userSchema = new Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    username: {type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    image: { type: String, required: false }
    //items: {type: [TodoItemSchema], required:true, default: []},
})
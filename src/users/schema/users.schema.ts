import { Schema } from 'mongoose'
import { TodoItemSchema } from './listitems.schema'

export const userSchema = new Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    username: {type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
    items: {type: [TodoItemSchema], required:true},
})
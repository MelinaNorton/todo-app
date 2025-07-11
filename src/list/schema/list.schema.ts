import { Schema } from "mongoose";
import { TodoItemSchema } from "./listitems.schema";

export const ListSchema = new Schema({
    list: {type:[TodoItemSchema], default: []},
    user_id: {type:String, default: ''}
})
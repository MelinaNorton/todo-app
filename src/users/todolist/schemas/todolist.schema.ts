import { Schema } from 'mongoose';
import { ToDo } from '../interfaces/todoitem.interface';

export const ToDoListSchema = new Schema<ToDo>({
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    id: {type:String}
})
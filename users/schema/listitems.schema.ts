import { Schema } from 'mongoose';

export const TodoItemSchema = new Schema({
  text:  { type: String, required: true },
  done:  { type: Boolean, default: false },
});
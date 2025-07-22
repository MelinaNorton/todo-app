import { Types } from "mongoose";
import { ToDo } from "./todoitem.interface";

export interface List {
    list : ToDo[],
    user_id : string
}
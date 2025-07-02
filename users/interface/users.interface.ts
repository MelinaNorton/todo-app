import { TodoItemSchema } from "users/schema/listitems.schema"
import { ToDo } from "./todoitem.interface"

export interface Users {
    firstname : string,
    lastname : string,
    username : string,
    password : string,
    items : ToDo[]
    email : string
}
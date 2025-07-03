import { TodoItemSchema } from "../schema/listitems.schema"
import { ToDo } from "../todolist/interfaces/todoitem.interface"

export interface User {
    firstname : string,
    lastname : string,
    username : string,
    password : string,
    items : ToDo[],
    email : string,
    _id: string
}
import { Types } from "mongoose";
export interface ToDo {
    text: string;
    done: boolean;
    _id: Types.ObjectId;
}

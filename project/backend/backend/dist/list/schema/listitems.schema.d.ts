import { Schema } from 'mongoose';
export declare const TodoItemSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    text: string;
    done: boolean;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    text: string;
    done: boolean;
}>, {}> & import("mongoose").FlatRecord<{
    text: string;
    done: boolean;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

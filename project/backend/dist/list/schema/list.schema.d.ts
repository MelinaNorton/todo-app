import { Schema } from "mongoose";
export declare const ListSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    user_id: string;
    list: import("mongoose").Types.DocumentArray<{
        text: string;
        done: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        text: string;
        done: boolean;
    }> & {
        text: string;
        done: boolean;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    user_id: string;
    list: import("mongoose").Types.DocumentArray<{
        text: string;
        done: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        text: string;
        done: boolean;
    }> & {
        text: string;
        done: boolean;
    }>;
}>, {}> & import("mongoose").FlatRecord<{
    user_id: string;
    list: import("mongoose").Types.DocumentArray<{
        text: string;
        done: boolean;
    }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, {
        text: string;
        done: boolean;
    }> & {
        text: string;
        done: boolean;
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

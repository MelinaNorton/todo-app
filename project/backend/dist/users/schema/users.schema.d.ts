import { Schema } from 'mongoose';
export declare const userSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    image?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    image?: string | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    image?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

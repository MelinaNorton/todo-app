import { Schema } from 'mongoose';
export declare const tokenSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    jti: string;
    sub?: string | null | undefined;
    createdAt?: string | null | undefined;
    expiresAt?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    jti: string;
    sub?: string | null | undefined;
    createdAt?: string | null | undefined;
    expiresAt?: string | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    jti: string;
    sub?: string | null | undefined;
    createdAt?: string | null | undefined;
    expiresAt?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;

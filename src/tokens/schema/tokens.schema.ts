import { Schema } from 'mongoose'

export const tokenSchema = new Schema({
    sub: {type:String, required:true},
    jti: {type:String, required:true},
    createdAt: {type:String, required:true},
    expiresAt: {type:String, required:true},
})
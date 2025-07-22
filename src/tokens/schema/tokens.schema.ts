import { Schema } from 'mongoose'

export const tokenSchema = new Schema({
    sub: {type:String, required:false},
    jti: {type:String, required:true},
    createdAt: {type:String, required:false},
    expiresAt: {type:String, required:false},
})
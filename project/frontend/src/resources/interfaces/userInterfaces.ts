import { listItem } from "./todoInterfaces"

export interface loginUser {
    username : string,
    password : string
}

export interface getUser {
    _id : string
}

export interface updateUserData {
    _id : string,
    username?:string,
    firstname?:string,
    lastname?:string,
    image?:string
}

export interface uploadFile {
    image : FormData
}

export interface newUser {
    username : string,
    firstname : string,
    lastname : string,
    password : string,
    email : string,
    image?: string,
    _id? : string
}

export interface user {
    username : string,
    firstname : string,
    lastname : string,
    password : string,
    email : string,
    image: string,
    _id : string
}

export interface newUserWithList {
    username : string,
    firstname : string,
    lastname : string,
    password : string,
    email : string,
    items : listItem[]
}
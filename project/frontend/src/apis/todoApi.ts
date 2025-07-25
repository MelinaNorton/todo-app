import { updateItem, deleteItem, newItem, listItem} from "@/resources/interfaces/todoInterfaces";
import { api } from "@/resources/helpers/publicResources";
import { refresh } from "@/resources/helpers/publicResources";
import { useRefresh } from "@/hooks/mutations/refreshMutation";
import axios from 'axios'

//fetch items endpoint; refresh/retries on 401
//no params/data necessary, since refresh/access token identifies us
export const fetchItems = async (token:string):Promise<listItem[]> =>{
    try{
        const resp = await api.get('/list/items', {headers: {Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        throw err
    }
}

//updateItems endpoint; refresh/retries on 401
export const updateItems = async(data : updateItem, token:string):Promise<listItem> =>{
    try{
        console.log("token sent to updateItems: ", token)
        const updateData = {done:data.done, text:data.text}
        const resp = await api.patch('/list/item', updateData,{params: { item_id: data.item_id, user_id: "" },headers: { Authorization: `Bearer ${token}` }});
        return resp.data
    }
    catch(err){
        throw err
    }
}

//delete Items endpoint; refresh/retry on 401
export const deleteItems = async(data : deleteItem, token:string):Promise<listItem> =>{

    try{
        const resp = await api.delete('/list/item', {params:data, headers: {Authorization : `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        throw err
    }
}

//add Items endpoint; refresh/retry on 401
export const addItems = async(data : newItem, token:string):Promise<listItem> =>{

    try{
        console.log("Attemp to add a new item")
        const resp = await api.post('/list/item', data, {headers: {Authorization : `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        throw err
    }
}
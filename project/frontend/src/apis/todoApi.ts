import { getItems, updateItem, deleteItem, newItem} from "@/resources/interfaces/todoInterfaces";
import { api } from "@/resources/helpers/publicResources";
import { useAuth } from "@/resources/context/authContext";
import { refresh } from "@/resources/helpers/publicResources";
import axios from 'axios'

//fetch items endpoint; refresh/retries on 401
//no params/data necessary, since refresh/access token identifies us
export const fetchItems = async (token:string):Promise<any> =>{
    try{
        const resp = await api.get('/list/items', {headers: {Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call fetchItems endpoint
                if(access){
                    return await fetchItems(access)
                }
            }
        }
    }
}

//updateItems endpoint; refresh/retries on 401
export const updateItems = async(data : updateItem, token:string):Promise<any> =>{
    try{
        console.log("token sent to updateItems: ", token)
        const updateData = {done:data.done, text:data.text}
        const resp = await api.patch('/list/item', updateData,{params: { item_id: data.item_id, user_id: "" },headers: { Authorization: `Bearer ${token}` }});
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call fetchItems endpoint
                if(access){
                    return await updateItems(data, token)
                }
            }
        }
    }
}

//delete Items endpoint; refresh/retry on 401
export const deleteItems = async(data : deleteItem, token:string):Promise<any> =>{

    try{
        const resp = await api.delete('/list/item', {params:data, headers: {Authorization : `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call fetchItems endpoint
                if(access){
                    return await deleteItems(data, token)
                }
            }
        }
    }
}

//add Items endpoint; refresh/retry on 401
export const addItems = async(data : newItem, token:string):Promise<any> =>{

    try{
        console.log("Attemp to add a new item")
        const resp = await api.post('/list/item', data, {headers: {Authorization : `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call fetchItems endpoint
                if(access){
                    return await addItems(data,token)
                }
            }
        }
    }
}
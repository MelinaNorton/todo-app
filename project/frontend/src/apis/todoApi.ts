import { getItems, updateItem, deleteItem} from "@/resources/interfaces/todoInterfaces";
import { api } from "@/resources/helpers/publicResources";
import { useAuth } from "@/resources/context/authContext";
import { refresh } from "@/resources/helpers/publicResources";
import axios from 'axios'
const context = useAuth()

//fetch items endpoint; refresh/retries on 401
export const fetchItems = async (data : getItems):Promise<any> =>{
    const token = context.token
    try{
        const resp = await api.get('/list/items', {params: data ,headers: {Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call fetchItems endpoint
                if(access){
                    return await fetchItems(data)
                }
            }
        }
    }
}

//updateItems endpoint; refresh/retries on 401
export const updateItems = async(data : updateItem):Promise<any> =>{
    const token = context.token
    try{
        const resp = await api.patch('/list/update', {params:data, headers:{Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call fetchItems endpoint
                if(access){
                    return await updateItems(data)
                }
            }
        }
    }
}

//delete Items endpoint; refresh/retry on 401
export const deleteItems = async(data : deleteItem):Promise<any> =>{
    const token = context.token

    try{
        const resp = await api.delete('/list', {params:data, headers: {Authorization : `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call fetchItems endpoint
                if(access){
                    return await deleteItems(data)
                }
            }
        }
    }
}
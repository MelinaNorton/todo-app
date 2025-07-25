import { api } from '@/resources/helpers/publicResources';
import axios from 'axios'
import { loginUser, updateUserData, uploadFile, newUser, user } from '@/resources/interfaces/userInterfaces';
import { refresh } from '@/resources/helpers/publicResources';
import { listItem } from '@/resources/interfaces/todoInterfaces';

export const getUsers = async(token:string):Promise<user[]> =>{
    try{
        console.log("Token recieved by getUsers: ", token)
        const resp = await api.get('/User/get', {headers: {Authorization : `Bearer ${token}`}})
        console.log("Returned User: ", resp.data)
        return resp.data
    }
    catch(err){
       if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call getUsers endpoint
                if(access){
                    return await getUsers(token)
                }
            }
        } 
        throw err
    }
}

//login endpoint (that initially sets the refresh(backend logic)/access token(state logic))
export const login = async(data : loginUser) =>{
    try{
        const resp = await api.post('/Auth/login', data)
        console.log("Token recieved on login: ", resp.data)
        return resp.data
    }
    catch(err){
        throw new Error("Errors logging in; check credentials & try again")
    }
}

export const logout = async(token:string) =>{
    try{
        const resp = await api.post('/Auth/logout')

        return resp.data
    }
    catch(err){
        throw new Error("Errors logging out")
    }
}

//signup endpoint
export const signup = async(data : newUser) =>{
    try{
        const emptyList:listItem[] = []
        const dataWithList = {...data, items:emptyList}
        const resp = await api.post('/auth/signup', dataWithList)

        const user_id = resp.data._id
        await api.post('/list', {user_id:user_id})
        return resp.data
    }
    catch(err){
        throw new Error("Errors creating new user")
    }
}

//update user data (uses access token auth header) & refresh/retry on 401
export const update = async(data : updateUserData, token:string): Promise<user[]> =>{
    try{
        const resp = await api.patch('/User/patch', data, {headers: {Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call update endpoint
                if(access){
                    return await update(data, token)
                }
            }
        }
        throw err
    }
}

//upload endpoint for profile image
export const upload = async(data : uploadFile, token:string):Promise<string> =>{
    try{
        console.log("data recieved by upload: ", data)
        const resp = await api.patch('/User/image', data.image, {headers:{Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        console.log(err)
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call update endpoint
                if(access){
                    return await upload(data, token)
                }
            }
        }
        throw err
    }
}

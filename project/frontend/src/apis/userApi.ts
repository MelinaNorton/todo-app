import { api } from '@/resources/helpers/publicResources';
import axios from 'axios'
import { loginUser, getUser, updateUserData, uploadFile, newUser } from '@/resources/interfaces/userInterfaces';
import { useAuth } from '@/resources/context/authContext';
import { refresh } from '@/resources/helpers/publicResources';

//context object to grab -> token & setToken
const context = useAuth()

//login endpoint (that initially sets the refresh(backend logic)/access token(state logic))
export const login = async(data : loginUser) =>{
    try{
        const resp = await api.post('/Auth/login', data)
        console.log("Token recieved on login: ", resp.data)
        context.setToken(resp.data)
        return resp.data
    }
    catch(err){
        throw new Error("Errors logging in; check credentials & try again")
    }
}

//signup endpoint
export const signup = async(data : newUser) =>{
    try{
        const resp = await api.post('/Auth/signup', data)
        return resp.data
    }
    catch(err){
        throw new Error("Errors creating new user")
    }
}

//update user data (uses access token auth header) & refresh/retry on 401
export const update = async(data : updateUserData): Promise<any> =>{
    try{
        const token = context.token
        const resp = await api.patch('/User/update', data, {headers: {Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call update endpoint
                if(access){
                    return await update(data)
                }
            }
        }
    }
}

//upload endpoint for profile image
export const upload = async(data : uploadFile):Promise<any> =>{
    const token = context.token
    try{
        const resp = await api.patch('/User/image', data, {headers:{Authorization: `Bearer ${token}`}})
        return resp.data
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.response?.status === 401){
                //call refresh endpoint
                const access = await refresh()
                //re-call update endpoint
                if(access){
                    return await upload(data)
                }
            }
        }
    }
}

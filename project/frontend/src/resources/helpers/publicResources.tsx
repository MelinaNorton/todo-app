import axios from 'axios'
import { useAuth } from '../context/authContext'

//api const to be used across the app w/base URL & refresh token included
export const api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true,
});

//refresh endpoint helper function
export const refresh = async() =>{
    const context = useAuth()
    try{
        const resp = await api.post("/Token/refresh")
        context.setToken(resp.data)
        return resp.data
    }
    catch(err){
        throw new Error("Errors refreshing access token; log back in to use the app")
    }
}
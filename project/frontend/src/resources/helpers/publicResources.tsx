import axios from 'axios'

//api const to be used across the app w/base URL & refresh token included
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

//refresh endpoint helper function
export const refresh = async() =>{
    console.log("REFRESHING!")
    try{
        const resp = await api.post("/Token/refresh")
        return resp.data
    }
    catch(err){
        //throw new Error("Errors refreshing access token; log back in to use the app")
    }
}
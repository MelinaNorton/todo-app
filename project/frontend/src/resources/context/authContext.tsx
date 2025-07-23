'use client'
import axios from 'axios'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../helpers/publicResources';
import { usePathname } from "next/navigation";

//context data to be shared through the hook
interface contextData {
    token:string,
    setToken: (t:string) => void
}

//the context object to wrap the app/children for access to the data/methods
export const AuthContext = createContext<contextData>({
    token: '',
    setToken: () => {}
})

//provider definition, with token/useToken states (via useEFfect), and auto-refresh on page reload, since state wont persist otherwise
export const AuthProvider = ({children}: {children:ReactNode}) =>{
    const [token, setToken] = useState("")
    const pathname = usePathname();
    
    useEffect(()=>{
        const tryRefresh = async() =>{
            try{
                console.log("Refresh function hit!")
                const res = await api.post('/Token/refresh')
                if(!res){
                    throw new Error("Invalid or empty token returned; log back in to continue using the app")
                }
                console.log("Response to refresh endpoint: ", res.data)
                setToken(res.data)
            }
            catch(err){
                throw new Error("Errors refreshing; log back in to continue using the app")
            }
        }

        tryRefresh()
    },[pathname])

    return(
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

//exported hook to connect files -> our stateful context
export const useAuth = () => useContext(AuthContext);


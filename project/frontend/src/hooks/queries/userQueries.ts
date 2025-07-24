'use client'
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/apis/userApi';
import { useAuth } from '@/resources/context/authContext';

//query for getting a user (no params/data, since our refresh token/access token both identify us)
export const useGetUsers = () =>{
    const context = useAuth()
    console.log("Token sent to useGetUsers: ", context.token)
    const query = useQuery({
        queryKey: ['User'],
        queryFn: () => getUsers(context.token),
        enabled: !!context.token
    })
    return query
}
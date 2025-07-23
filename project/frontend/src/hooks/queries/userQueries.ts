import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/apis/userApi';
import { useAuth } from '@/resources/context/authContext';

//query for getting a user (no params/data, since our refresh token/access token both identify us)
export const useGetUsers = () =>{
    const context = useAuth()
    const query = useQuery({
        queryKey: ['User'],
        queryFn: () => getUsers(context.token)
    })
    return query
}
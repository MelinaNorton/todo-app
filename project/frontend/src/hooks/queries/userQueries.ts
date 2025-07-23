import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/apis/userApi';

//query for getting a user (no params/data, since our refresh token/access token both identify us)
export const useGetUsers = () =>{
    const query = useQuery({
        queryKey: ['User'],
        queryFn: () => getUsers()
    })
    return query
}
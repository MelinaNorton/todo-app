import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/apis/todoApi';
import { useAuth } from '@/resources/context/authContext';

export const useFetchItems = () =>{
    const context = useAuth()
    const query = useQuery({
        queryKey: ['list'],
        queryFn: () => fetchItems(context.token)
    })
    return query
}
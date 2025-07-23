import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/apis/todoApi';

export const useFetchItems = () =>{
    const query = useQuery({
        queryKey: ['list'],
        queryFn: () => fetchItems()
    })
    return query
}
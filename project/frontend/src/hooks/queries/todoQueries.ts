'use client'
import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/apis/todoApi';
import { useAuth } from '@/resources/context/authContext';
import { newItem } from '@/resources/interfaces/todoInterfaces';

export const useFetchItems = () =>{
    const context = useAuth()
    console.log("Token used in useFetchItems: ", context.token)
    const query = useQuery<newItem[]>({
        queryKey: ['list'],
        queryFn: () => fetchItems(context.token)
    })
    return query
}
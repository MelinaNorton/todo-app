import { updateItems, deleteItems, addItems } from "@/apis/todoApi";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem, newItem, deleteItem } from "@/resources/interfaces/todoInterfaces";
import { useAuth } from "@/resources/context/authContext";
import { listItem } from "@/resources/interfaces/todoInterfaces";
//mutation hook to update list-item data
export const useUpdateItems = () =>{
    const context = useAuth()
    
    const qc = useQueryClient()
    const mutation = useMutation<listItem, AxiosError, updateItem, any>({
        mutationFn: (data) => updateItems(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['list']})
            const prev = qc.getQueryData(['list'])
            qc.setQueryData(['user'], (old) =>({
                ...(old as updateItem),
                ...variables
            }))
            return {prev}
        },
        onError: (err, data, context) =>{
            qc.setQueryData(['list'], context?.prev);
        },
        onSettled: () =>{
            qc.invalidateQueries({queryKey:['list']})
        }
    })
    return mutation
}

//mutation hook to update user-profile data
export const useAddItem = () =>{
    console.log("Mutation reached in useAddItem!")
    const context = useAuth()
    const qc = useQueryClient()
    const mutation = useMutation<newItem, AxiosError, newItem, any>({
        mutationFn: (data) => addItems(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['user']})
            const prev = qc.getQueryData(['user'])
            qc.setQueryData(['list'], (old: newItem[] = []) => [...old, variables])
            return {prev}
        },
        onError: (err, data, context) =>{
            qc.setQueryData(['list'], context?.prev);
        },
        onSettled: () =>{
            qc.invalidateQueries({queryKey:['list']})
        }
    })
    return mutation
}

//mutation hook to delete a listitem from a user's list
export const useDeleteItem = () =>{
    const context = useAuth()
    const qc = useQueryClient()
    const mutation = useMutation<newItem, AxiosError, deleteItem, any>({
        mutationFn: (data) => deleteItems(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['list']})
            const prev = qc.getQueryData(['list'])
            qc.setQueryData<newItem[]>(['list'], (old: newItem[] = []) => old.filter(item => item.item_id !== variables.item_id))
            return {prev}
        },
        onError: (err, data, context) =>{
            qc.setQueryData(['list'], context?.prev);
        },
        onSettled: () =>{
            qc.invalidateQueries({queryKey:['list']})
        }
    })
    return mutation
}
import { updateItems, deleteItems, addItems } from "@/apis/todoApi";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem, newItem, deleteItem } from "@/resources/interfaces/todoInterfaces";
import { useAuth } from "@/resources/context/authContext";
import { listItem } from "@/resources/interfaces/todoInterfaces";
import { useRefresh } from "./refreshMutation";
//mutation hook to update list-item data

type UpdateItemsContext = { prev?: listItem[] };
type AddItemContext = { prev?: newItem[] };
type DeleteItemContext = { prev?: newItem[] };

export const useUpdateItems = () =>{
    const context = useAuth()
    const refresher = useRefresh()

    const qc = useQueryClient()
    const mutation = useMutation<listItem, AxiosError, updateItem, UpdateItemsContext>({
        mutationFn: (data) => updateItems(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['list']})
            const prev = qc.getQueryData<listItem[]>(['list'])
            qc.setQueryData(['user'], (old) =>({
                ...(old as updateItem),
                ...variables
            }))
            return {prev}
        },
        onError: async(err, data, context) =>{
            qc.setQueryData(['list'], context?.prev);
            const access = await refresher()
            if(access){
                return updateItems(data, access)
            }
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
    const refresher = useRefresh()

    const mutation = useMutation<newItem, AxiosError, newItem, AddItemContext>({
        mutationFn: (data) => addItems(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['user']})
            const prev = qc.getQueryData<newItem[]>(['user'])
            qc.setQueryData(['list'], (old: newItem[] = []) => [...old, variables])
            return {prev}
        },
        onError: async(err, data, context) =>{
            qc.setQueryData(['list'], context?.prev);
            const access = await refresher()
            if(access){
                return addItems(data, access)
            }
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
    const refresher = useRefresh()

    const mutation = useMutation<newItem, AxiosError, deleteItem, DeleteItemContext>({
        mutationFn: (data) => deleteItems(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['list']})
            const prev = qc.getQueryData<listItem[]>(['list'])
            qc.setQueryData<newItem[]>(['list'], (old: newItem[] = []) => old.filter(item => item.item_id !== variables.item_id))
            return {prev}
        },
        onError: async (err, data, context) =>{
            qc.setQueryData(['list'], context?.prev);
            const access = await refresher()
            if(access){
                return deleteItems(data, access)
            }
        },
        onSettled: () =>{
            qc.invalidateQueries({queryKey:['list']})
        }
    })
    return mutation
}
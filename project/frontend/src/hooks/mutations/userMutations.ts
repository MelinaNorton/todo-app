import { update, login, signup, upload } from "@/apis/userApi";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, newUser, updateUserData, uploadFile } from "@/resources/interfaces/userInterfaces";
import { AxiosError } from "axios";
import { useAuth } from "@/resources/context/authContext";

//all below mutations, besides login & signup, utilize query-canceling, optimistic patching, and on-error rollbacks

//mutation hook to update user-profile data
export const useUpdateUser = () =>{
    const context = useAuth()
    const qc = useQueryClient()
    const mutation = useMutation<newUser, AxiosError, updateUserData, any>({
        mutationFn: (data) => update(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['User']})
            const prev = qc.getQueryData(['User'])
            qc.setQueryData(['User'], (old) =>({
                ...(old as updateUserData),
                ...variables
            }))
            return {prev}
        },
        onError: (err, data, context) =>{
            qc.setQueryData(['User'], context?.prev);
        },
        onSettled: () =>{
            qc.invalidateQueries({queryKey:['User']})
        }
    })
    return mutation
}

//mutation hook to login user
export const useLoginUser = () =>{
    const mutation = useMutation<newUser, AxiosError, loginUser, any>({
        mutationFn: (data) => login(data),
        onError: (err, data, context) =>{
            return err.message;
        },
    })
    return mutation
}

//mutation hook to create a new user
export const useSignupUser = () =>{
    const qc = useQueryClient()
    const mutation = useMutation<newUser, AxiosError, newUser, any>({
        mutationFn: (data) => signup(data),
        onError: (err, data, context) =>{
            return err.message
        }
    })
    return mutation
}

//mutation hook to upload a new profile image
export const userUpload = () =>{
    const context = useAuth()
    const qc = useQueryClient()
    const mutation = useMutation<string, AxiosError, uploadFile, any>({
        mutationFn: (data) => upload(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['User']})
            const prev = qc.getQueryData(['User'])
            const file = variables.image.get('image') as File;
            const previewUrl = URL.createObjectURL(file);

            qc.setQueryData(['User'], (old) =>({
                ...(old as newUser),
                image:previewUrl
            }))
            return {prev}
        },
        onError: (err, data, context) =>{
            qc.setQueryData(['User'], context?.prev);
        },
        onSettled: () =>{
            qc.invalidateQueries({queryKey:['User']})
        }
    })
    return mutation
}

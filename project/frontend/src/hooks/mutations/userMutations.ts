'use client'
import { update, login, signup, upload, logout } from "@/apis/userApi";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, newUser, newUserWithList, updateUserData, uploadFile } from "@/resources/interfaces/userInterfaces";
import { AxiosError } from "axios";
import { useAuth } from "@/resources/context/authContext";
import { useRouter } from "next/navigation";

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
    const router = useRouter()
    const context = useAuth()
    const mutation = useMutation<string, AxiosError, loginUser, any>({
        mutationFn: (data) => login(data),
        onError: (err, data, context) =>{
            return err.message;
        },
        onSuccess: (response) =>{
            context.setToken(response ? response : "")
            router.push('/home')
        }
    })
    return mutation
}

//mutation hook to logout user
export const useLogoutUser = () =>{
    const router = useRouter()
    const context = useAuth()
    const mutation = useMutation<void, AxiosError, void>({
        mutationFn: () => logout(context.token),
        onError: (err, data, context) =>{
            return err.message;
        },
        onSuccess:()=>{
            router.push('/login')
        }
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
export const useUpload = () =>{
    const context = useAuth()
    const qc = useQueryClient()
    console.log("Mutation triggerd @upload; data: ")
    const mutation = useMutation<string, AxiosError, uploadFile, any>({
        mutationFn: (data) => upload(data, context.token),
        onMutate: async(variables) =>{
            await qc.cancelQueries({queryKey: ['User']})
            const prev = qc.getQueryData<newUser[]>(['User'])
            const file = variables.image.get('file') as File;
            const previewUrl = URL.createObjectURL(file);

            qc.setQueryData<newUser[]>(['User'], (old) =>(
                old!.map((u, i) =>
                    i === 0
                    ? {
                    ...u,
                image: previewUrl,
                }
                : u,
                )
             ))
            return {prev}
        },
        onError: (err, data, context) =>{
            qc.setQueryData<newUser[]>(['User'], context?.prev);
        },
        onSuccess: () =>{
            qc.invalidateQueries({queryKey:['User']})
        }
    })
    return mutation
}

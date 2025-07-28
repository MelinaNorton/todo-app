'use client'
import { update, login, signup, upload, logout } from "@/apis/userApi";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, newUser, updateUserData, uploadFile, user } from "@/resources/interfaces/userInterfaces";
import { AxiosError } from "axios";
import { useAuth } from "@/resources/context/authContext";
import { useRouter } from "next/navigation";
import { useRefresh } from "./refreshMutation";
//all below mutations, besides login & signup, utilize query-canceling, optimistic patching, and on-error rollbacks

type UpdateUserContext = { prev?: updateUserData }
type UploadContext = { prev?: newUser[] }

//mutation hook to update user-profile data
export const useUpdateUser = () =>{
    const context = useAuth()
    const qc = useQueryClient()
    const refresher = useRefresh()

    const mutation = useMutation<user[], AxiosError, updateUserData, UpdateUserContext>({
        mutationFn: (data) => update(data, context.token),
        onMutate: async(variables): Promise<UpdateUserContext> =>{
            await qc.cancelQueries({queryKey: ['User']})
            const prev = qc.getQueryData<updateUserData>(['User']) as | updateUserData | undefined
            qc.setQueryData(['User'], (old) =>({
                ...(old as updateUserData),
                ...variables
            }))
            return {prev}
        },
        onError: async(err, data, context) =>{
            qc.setQueryData(['User'], context?.prev);
            const access = await refresher()
            if(access){
                return update(data, access)
            }
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
    const mutation = useMutation<string, AxiosError, loginUser, string>({
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
    const router = useRouter()
    const qc = useQueryClient()
    const mutation = useMutation<newUser, AxiosError, newUser, undefined>({
        mutationFn: (data) => signup(data),
        onError: (err, data, context) =>{
            return err.message
        },
        onSuccess:() =>{
            router.push('/login')
        }
    })
    return mutation
}

//mutation hook to upload a new profile image
export const useUpload = () =>{
    const context = useAuth()
    const qc = useQueryClient()
    const refresher = useRefresh()

    console.log("Mutation triggerd @upload; data: ")
    const mutation = useMutation<string, AxiosError, uploadFile, UploadContext>({
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
        onError: async(err, data, context) =>{
            qc.setQueryData<newUser[]>(['User'], context?.prev);
            const access = await refresher()
                if(access){
                    return upload(data, access)
                }
        },
        onSuccess: () =>{
            qc.invalidateQueries({queryKey:['User']})
        }
    })
    return mutation
}

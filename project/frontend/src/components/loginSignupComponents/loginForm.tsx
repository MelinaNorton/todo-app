'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/resources/schemas/userSchemas';
import { loginUser } from '@/resources/interfaces/userInterfaces';
import { useLoginUser } from '@/hooks/mutations/userMutations';
import GeneralButton from '../generalButton';
import { useRouter } from 'next/navigation' // for client components

export default function LoginForm(){
    const login = useLoginUser()
    const router = useRouter()

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<loginUser>({
        resolver: yupResolver(loginSchema),
        defaultValues:{
            username: '',
            password: ''
        }
    });

    const onSubmit = (data : loginUser) =>{
        login.mutate(data)
        router.push('/home')
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 h-40 w-55 rounded-4xl items-center justify-center">
                <div className="flex flex-col space-y-1 justify-center items-center h-auto">
                    {errors?.username?.message ? <p className="text-red-700 text-sm">{errors.username.message}</p> : <p></p>}
                    {login.isError ? <p className="text-red-700 text-sm">{login.error.message}</p> : <p></p>}
                    <input type="text" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('username')} placeholder='enter username'></input>
                    {errors?.password?.message ? <p className="text-red-700 text-sm">{errors.password.message}</p> : <p></p>}
                    <input type="password" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('password')} placeholder='enter password'></input>
                </div>
                <GeneralButton type="submit" text="login"/>
            </form>
        <GeneralButton type="button" text="sign up" action={() => router.push('/signup')}/>
        </div>
    )
}
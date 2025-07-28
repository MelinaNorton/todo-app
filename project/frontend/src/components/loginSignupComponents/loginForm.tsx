'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/resources/schemas/userSchemas';
import { loginUser } from '@/resources/interfaces/userInterfaces';
import { useLoginUser } from '@/hooks/mutations/userMutations';
import GeneralButton from '../generalButton';
import { useRouter } from 'next/navigation'

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
        //router.push('/home')
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 h-40 w-70 rounded-4xl items-center justify-center">
                <div className="flex flex-col space-y-1 justify-center items-center h-auto">
                    {errors?.username?.message ? <p className="text-red-700 text-sm">{errors.username.message}</p> : <p></p>}
                    {login.isError ? <p className="text-red-700 text-sm">{login.error.message}</p> : <p></p>}
                    <input type="text" className="text-gray-400 font-semibold w-full md:w-35 h-7 bg-white rounded-2xl p-2 focus:outline-none focus:ring-0" {...register('username')} placeholder='enter username'></input>
                    {errors?.password?.message ? <p className="text-red-700 text-sm">{errors.password.message}</p> : <p></p>}
                    <input type="password" className="text-gray-400 font-semibold w-full md:w-35 h-7 bg-white rounded-2xl p-2 focus:outline-none focus:ring-0" {...register('password')} placeholder='enter password'></input>
                </div>
                <GeneralButton type="submit" text="login"/>
            </form>
        <GeneralButton type="button" text="sign up" action={() => router.push('/signup')}/>
        </div>
    )
}
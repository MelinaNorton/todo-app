'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/resources/schemas/userSchemas';
import { newUser, newUserWithList } from '@/resources/interfaces/userInterfaces';
import GeneralButton from './generalButton';
import { useSignupUser } from '@/hooks/mutations/userMutations';
import { listItem } from '@/resources/interfaces/todoInterfaces';

export default function SignupForm(){
    const signupUser = useSignupUser()

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<newUser>({
        resolver: yupResolver(signupSchema),
        defaultValues:{
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: ''
        }
    });

    const onSubmit = (data : newUser) =>{
        signupUser.mutate(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center space-y-2 h-40 w-40 rounded-4xl">
            {errors?.username?.message ? <p className="text-red-700 text-sm">{errors.username.message}</p> : <p></p>}
            <input type="text" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('username')} placeholder='enter username'></input>
            {errors?.password?.message ? <p className="text-red-700 text-sm">{errors.password.message}</p> : <p></p>}
            <input type="password" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('password')} placeholder='enter password'></input>
            {errors?.firstname?.message ? <p className="text-red-700 text-sm">{errors.firstname.message}</p> : <p></p>}
            <input type="text" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('firstname')} placeholder='enter firstname'></input>
            {errors?.lastname?.message ? <p className="text-red-700 text-sm">{errors.lastname.message}</p> : <p></p>}
            <input type="text" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('lastname')} placeholder='enter lastname'></input>
            {errors?.email?.message ? <p className="text-red-700 text-sm">{errors.email.message}</p> : <p></p>}
            <input type="text" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('email')} placeholder='enter email'></input>
            <GeneralButton type="submit" text="signup"/>
        </form>
    )
}
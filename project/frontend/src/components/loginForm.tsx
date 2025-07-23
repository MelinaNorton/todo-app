import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/resources/schemas/userSchemas';
import { loginUser } from '@/resources/interfaces/userInterfaces';
import { useLoginUser } from '@/hooks/mutations/userMutations';
import GeneralButton from './generalButton';
const login = useLoginUser()

export default function LoginForm(){
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
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="h-40 w-55 rounded-4xl">
            {errors?.username?.message ? <p className="text-red-700 text-sm">{errors.username.message}</p> : <p></p>}
            <input type="text" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('username')} placeholder='enter username'></input>
            {errors?.password?.message ? <p className="text-red-700 text-sm">{errors.password.message}</p> : <p></p>}
            <input type="password" className="w-full md:w-25 h-7 bg-white rounded-4xl" {...register('password')} placeholder='enter password'></input>
            <GeneralButton type="submit" text="login"/>
        </form>
    )
}
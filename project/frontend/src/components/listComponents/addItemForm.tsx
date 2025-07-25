'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { listItemSchema } from '@/resources/schemas/listSchemas';
import { newItem, listItem, listData } from '@/resources/interfaces/todoInterfaces';
import { useAddItem } from '@/hooks/mutations/todoMutations';
import GeneralButton from '../generalButton';

export default function AddItemForm(){
    const adder = useAddItem()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        } = useForm<listData>({
            resolver: yupResolver(listItemSchema),
            defaultValues:{
                text: '',
                done: false,
            }   
        });
    
        const onSubmit = (data : listData) =>{
            console.log("data passed to mutation: ", data)
            adder.mutate(data)
            reset()
        }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="absolute top-0 flex flex-col space-y-1 h-40 w-60 rounded-4xl items-center justify-center">
                <div className="flex flex-col space-y-1 justify-center items-center">
                    {errors?.text?.message ? <p className="text-red-700 text-sm">{errors.text.message}</p> : <p></p>}
                    <input type="text" className="w-full md:w-35 text-center h-7 bg-white rounded-4xl focus:outline-none focus:ring-0 text-gray-800/50 font-bold" {...register('text')} placeholder='enter description'></input>
                    {errors?.done?.message ? <p className="text-red-700 text-sm">{errors.done.message}</p> : <p></p>}
                </div>
            <GeneralButton type="submit" text="add"/>
        </form>
    )
}
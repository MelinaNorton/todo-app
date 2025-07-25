'use client'
import { useUpdateUser } from "@/hooks/mutations/userMutations"
import { useState } from "react"
import GeneralButton from "../generalButton"

type profileItemProps = {
    label: 'username' | 'firstname' | 'lastname' | 'email' | 'image',
    text: string
}

export default function ProfileItem({label,text}:profileItemProps){
    const updater = useUpdateUser()
    const [changeField, setChangeField] = useState(false)
    const [newValue, setNewValue] = useState("")
    const makeChange = (data:string) =>{
        updater.mutate({[label]:data, _id:''})
        setChangeField(!changeField)
    }
    return(
        <div className={`shadow-sm shadow-blue-950/30 flex flex-row items-center justify-between w-full h-auto rounded-2xl bg-blue-950/10 p-2 transition-transform hover:scale-101 duration-500 hover:shadow-md  ${changeField ? 'flex-col space-y-2' : 'flex-row items-center'}`}>
            <div className="flex flex-row w-55 justify-between items-center">
                <p className="text-white font-semibold tracking-wider">{label}</p>
                <p className="text-white">{text}</p>
            </div>
            {changeField ? 
            <div className="flex flex-col space-y-2">
                <input type="text" placeholder="enter new value" value={newValue} onChange={e => setNewValue(e.target.value)}className="text-gray-400 font-semibold w-full md:w-25 h-7 bg-white rounded-2xl p-2 focus:outline-none focus:ring-0"></input>
                <GeneralButton type="button" text="submit" action={()=>makeChange(newValue)}/>
            </div>
                : 
            <GeneralButton type="button" text="change" action={()=>setChangeField(!changeField)}/>}
        </div>
    )
}
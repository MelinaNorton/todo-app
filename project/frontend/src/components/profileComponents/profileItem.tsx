'use client'
import { useUpdateUser } from "@/hooks/mutations/userMutations"
import { useState } from "react"
import GeneralButton from "../generalButton"
import { updateUserData } from "@/resources/interfaces/userInterfaces"

type profileItemProps = {
    label: 'username' | 'firstname' | 'lastname' | 'email',
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
        <div className="flex flex-row w-full justify-between items-center rounded-4xl border-2 border-b-blue-950/70 shadow-blue-950">
            <div className="flex flex-row w-55 justify-between items-center">
                <p className="text-white text-bold tracking-wider">{label}</p>
                <p className="text-white text-light tracking-wider">{text}</p>
            </div>
            {changeField ? 
            <div className="flex flex-col space-y-2">
                <input type="text" placeholder="enter new value" value={newValue} onChange={e => setNewValue(e.target.value)}className="w-full md:w-25 h-7 bg-white rounded-4xl"></input>
                <GeneralButton type="button" text="submit" action={()=>makeChange(newValue)}/>
            </div>
                : 
            <GeneralButton type="button" text="change" action={()=>setChangeField(!changeField)}/>}
        </div>
    )
}
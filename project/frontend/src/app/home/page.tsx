'use client'
import List from "@/components/listContainer"
import GeneralButton from "@/components/generalButton"
import { useRouter } from "next/navigation"

export default function homePage() {
    const router = useRouter()
    return(
        <div className="flex flex-col items-center justify-center p-5 w-screen h-screen bg-blue-50">
            <GeneralButton type="button" text="profile" action={()=>router.push('/profile')}/>
            <List></List>
        </div>
    )
}
'use client'
import List from "@/components/listComponents/listContainer"
import GeneralButton from "@/components/generalButton"
import { useRouter } from "next/navigation"

export default function HomePage() {
    const router = useRouter()
    return(
        <div className="flex flex-col items-center justify-center p-5 w-screen h-screen bg-blue-50 space-y-4">
            <GeneralButton type="button" text="profile" action={()=>router.push('/profile')}/>
            <List></List>
        </div>
    )
}
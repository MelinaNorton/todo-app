'use client'

import SignupForm from "./signupForm"
import GeneralButton from "../generalButton"
import { useRouter } from 'next/navigation' // for client components

export default function SignupBox(){
    const router = useRouter()
    return(
        <div className="flex flex-col items-center space-y-6 justify-center h-[60vw] md:h-110 w-90 bg-blue-100 rounded-4xl">
            <GeneralButton type="button" text="back" action={() => router.push('/login')}/>
            <SignupForm/>
        </div>
    )
}
import SignupForm from "./signupForm"

export default function signupBox(){
    return(
        <div className="flex flex-col items-center justify-center h-[50vw] md:h-60 w-full bg-blue-100 rounded-4xl">
            <SignupForm/>
        </div>
    )
}
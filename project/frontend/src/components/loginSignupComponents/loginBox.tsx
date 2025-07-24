import LoginForm from "./loginForm"
import generalButton from "../generalButton"

export default function LoginBox(){
    return(
        <div className="flex flex-col items-center justify-center h-[30vw] md:h-70 w-70 bg-blue-100 rounded-4xl">
            <LoginForm/>
        </div>
    )
}
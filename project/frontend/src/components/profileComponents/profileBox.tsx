'use client'
import { useGetUsers } from "@/hooks/queries/userQueries"
import ProfileItem from "./profileItem"
import ProfileImage from "./profileImage";
import { useRouter } from "next/navigation";
import GeneralButton from "../generalButton";
import { useLogoutUser } from "@/hooks/mutations/userMutations";

type UserField = 'username' | 'firstname' | 'lastname' | 'email';

export default function ProfileBox (){
const logout = useLogoutUser()
const router = useRouter()
const { data: user, isLoading, isError } = useGetUsers()

if (isLoading) return <div>Loading profile…</div>
if (isError  ) return <div>Failed to load profile.</div>
if (!user   ) return null

const userData: [UserField, string][] = [['username',  user[0].username],['firstname', user[0].firstname],['lastname',  user[0].lastname],['email', user[0].email],];
let src = ''
if(user[0].image != ''){src = user[0].image}
console.log("User Data: ", user)

    return(
        <div className="flex flex-col items-center justify-center space-y-3">
            <GeneralButton type="button" text="back" action={()=>router.push('/home')}/>
            <div className="flex flex-col items-center space-y-4 justify-between h-40 md:h-132 w-120 bg-blue-100 rounded-4xl p-8">
                <ProfileImage src={src}/>
                <div className="flex flex-col items-center space-y-4 w-full">
                    {userData.map(([field, val,], i)=>
                        <ProfileItem label={field} text={val}/>
                    )}
                </div>
                <GeneralButton type="button" text="logout" action={()=>logout.mutate()}/>
            </div>
        </div>
    )
}
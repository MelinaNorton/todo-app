'use client'
import { useGetUsers } from "@/hooks/queries/userQueries"
import ProfileItem from "./profileItem"

type UserField = 'username' | 'firstname' | 'lastname' | 'email';

export default function ProfileBox (){
const { data: user, isLoading, isError } = useGetUsers()

if (isLoading) return <div>Loading profile…</div>
if (isError  ) return <div>Failed to load profile.</div>
if (!user   ) return null

const userData: [UserField, string][] = [['username',  user[0].username],['firstname', user[0].firstname],['lastname',  user[0].lastname],['email', user[0].email],];
console.log("User Data: ", user)

    return(
        <div className="flex flex-col items-center gap-y-4 justify-center h-40 md:h-90 w-110 bg-blue-100 rounded-4xl p-4">
            {userData.map(([field, val,], i)=>
                <ProfileItem label={field} text={val}/>
            )}
        </div>
    )
}
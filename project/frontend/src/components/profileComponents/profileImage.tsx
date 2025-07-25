import { FormEvent } from "react"
import { ChangeEvent } from "react"
import { useState } from "react"
import { useUpload } from "@/hooks/mutations/userMutations"
import GeneralButton from "../generalButton"

type profileImageProps={
    src:string
}

export default function ProfileImage({src}:profileImageProps){
    const updater = useUpload()
    const [file, setFile] = useState<File | null>(null)
    const [placeholder, setPlaceholder] = useState("Select a File")
    
    const setFileChoice = (e:ChangeEvent<HTMLInputElement>) =>{
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleSumbit = async (e:FormEvent) =>{
        console.log("file recieved: ", file)
        e.preventDefault()
        if(!file){
            setPlaceholder("No File Selected")
            return
        }

        const formData = new FormData()
        formData.append('file', file)
        console.log(Array.from(formData.entries()))
        updater.mutate({image : formData})
    }

    return(
        <div className="w-full md:w-18 h-18 rounded-4xl space-y-2 items-center justify-center">
            <img src={src} className="rounded-4xl h-18 w-18"></img>
            <form onSubmit={handleSumbit} className="flex flex-row space-x-2 items-center justify-center">
                <input type="file" accept="image/*" onChange={setFileChoice} className="w-full md:w-25 h-7 bg-white rounded-4xl" placeholder="choose file"/>
                <GeneralButton type="submit" text="submit"/>
            </form>
        </div>
    )
}
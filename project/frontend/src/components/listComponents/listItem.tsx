'use client'
import { useUpdateItems } from "@/hooks/mutations/todoMutations"
import { useDeleteItem } from "@/hooks/mutations/todoMutations"

type listItemProps = {
    text:string,
    done:boolean,
    item_id:string,
    bg:string
}

export default function ListItem({text,done, item_id, bg}:listItemProps){
    const updater = useUpdateItems()
    const deleter = useDeleteItem()
    console.log("Item ID poplated for this listItem: ", item_id)
    return(
            <div className={`shadow-sm shadow-blue-950/30 flex flex-row items-center justify-between w-70 h-11 rounded-2xl ${bg} p-4 transition-transform hover:scale-103 duration-500 hover:shadow-md`}>
                <div className="flex flex-row items-center justify-center space-x-3">
                    <input type="checkbox" className="hover:cursor-pointer" checked={done} onChange={()=>updater.mutate({done:!done, item_id:item_id})}></input>
                    <button className="text-blue-950 hover:text-blue-950/70 hover:cursor-pointer transition-transform hover:scale-110 active:scale-95" onClick={()=>deleter.mutate({item_id:item_id})}>X</button>
                </div>
                <p className="text-white text-bold">{text}</p>
            </div>
    )
}
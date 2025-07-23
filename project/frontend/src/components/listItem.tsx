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
    
    return(
        <div>
            <div className={`flex flex-row items-center justify-between w-30 h-5 ${bg}`}>
                <div className="flex flex-row items-end justify-center">
                    <input type="checkbox" checked={done} onChange={()=>updater.mutate({done:!done, item_id:item_id})}></input>
                    <button className="text-blue-950 hover:text-blue-950/70" onClick={()=>deleter.mutate({item_id:item_id})}>X</button>
                    <p className="text-white text-bold">{text}</p>
                </div>
            </div>
        </div>
    )
}
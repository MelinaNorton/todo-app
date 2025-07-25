'use client'
import ListItem from "./listItem"
import { useFetchItems } from "@/hooks/queries/todoQueries"
import { newItem } from "@/resources/interfaces/todoInterfaces"
import AddItemForm from "./addItemForm"

export default function List(){
    const { data: items, isLoading, isError } = useFetchItems()
    console.log("Data recieved from useFetchItems: ", items)
    const bgcolors =['bg-blue-950/80', 'bg-blue-800/80', 'bg-blue-700/80', 'bg-blue-600/80', 'bg-blue-500/80', 'bg-blue-400/80']
    return(
        <div className="relative flex flex-col items-center gap-y-4 justify-end h-[40vw] md:h-140 w-95 bg-blue-100 rounded-4xl p-4">
            <AddItemForm></AddItemForm>
            <div className="flex flex-col space-y-4 h-100 w-full items-center justify-start overflow-y-scroll [&::-webkit-scrollbar]:hidden p-2">
                {items?.map((item, i)=>
                    <ListItem text={item.text} done={item.done} item_id={item._id} key={i} bg={bgcolors[i % bgcolors.length]}/>
                )}
            </div>
        </div>
    )
}
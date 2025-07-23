'use client'
import ListItem from "./listItem"
import { useFetchItems } from "@/hooks/queries/todoQueries"
import { newItem } from "@/resources/interfaces/todoInterfaces"

export default function List(){
    const { data: items, isLoading, isError } = useFetchItems()
    const bgcolors =['bg-blue-950', 'bg-blue-800', 'bg-blue-700', 'bg-blue-600', 'bg-blue-500', 'bg-blue-400']
    return(
        <div className="flex flex-col items-center justify-center h-[30vw] md:h-40 w-full bg-blue-100 rounded-4xl">
            {items?.map((item, i)=>
                <ListItem text={item.text} done={item.done} item_id={item.item_id} key={i} bg={bgcolors[i % bgcolors.length]}/>
            )}
        </div>
    )
}
'use client'
import ListItem from "./listItem"
import { useFetchItems } from "@/hooks/queries/todoQueries"
import { newItem } from "@/resources/interfaces/todoInterfaces"
import AddItemForm from "./addItemForm"

export default function List(){
    const { data: items, isLoading, isError } = useFetchItems()
    console.log("Data recieved from useFetchItems: ", items)
    const bgcolors =['bg-blue-950', 'bg-blue-800', 'bg-blue-700', 'bg-blue-600', 'bg-blue-500', 'bg-blue-400']
    return(
        <div className="flex flex-col items-center gap-y-4 justify-center h-[40vw] md:h-140 w-80 bg-blue-100 rounded-4xl overflow-y-scroll [&::-webkit-scrollbar]:hidden">
            <AddItemForm></AddItemForm>
            {items?.map((item, i)=>
                <ListItem text={item.text} done={item.done} item_id={item._id} key={i} bg={bgcolors[i % bgcolors.length]}/>
            )}
        </div>
    )
}
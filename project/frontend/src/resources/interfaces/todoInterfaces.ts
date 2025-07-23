export interface getItems {
    _id : string
}

export interface updateItem {
    item_id : string,
    text?: string,
    done?: boolean
}

export interface deleteItem {
    _id : string,
    item_id : string
}

export interface newItem {
    text:string,
    done:boolean,
    item_id?:string
}
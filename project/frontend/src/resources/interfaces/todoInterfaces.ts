export interface getItems {
    _id : string
}

export interface updateItem {
    item_id : string,
    text?: string,
    done?: boolean
}

export interface deleteItem {
    item_id : string
}

export interface newItem {
    text:string,
    done:boolean,
    item_id?:string
}

export interface listItem {
    text:string,
    done:boolean,
    _id:string
}

export interface listData {
    text:string,
    done:boolean,
}
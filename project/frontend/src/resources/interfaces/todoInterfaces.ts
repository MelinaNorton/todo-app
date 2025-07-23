export interface getItems {
    _id : string
}

export interface updateItem {
    _id : string,
    item_id : string,
    text?: string,
    done?: boolean
}

export interface deleteItem {
    _id : string,
    item_id : string
}
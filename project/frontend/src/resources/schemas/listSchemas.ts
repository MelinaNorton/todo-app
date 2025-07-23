import * as yup from 'yup'

export const listItemSchema = yup.object({
    text: yup.string(),
    done: yup.boolean().default(false)
})
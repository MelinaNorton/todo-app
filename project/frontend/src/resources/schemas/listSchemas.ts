import * as yup from 'yup'

export const listItemSchema = yup.object({
    text: yup.string().required(),
    done: yup.boolean().default(false).required()
})
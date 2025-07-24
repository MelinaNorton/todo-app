import * as yup from 'yup'
import { listItemSchema } from './listSchemas'
export const loginSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

export const signupSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required(),
})



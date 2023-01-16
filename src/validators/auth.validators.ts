import { z } from 'zod'

export const registerSchema = z
    .object({
        name: z.string({ required_error: 'name is required' }),
        email: z
            .string({ required_error: 'email is required' })
            .email('email should be valid'),
        password: z.string({ required_error: 'password is required' }),
        confirmPassword: z.string({
            required_error: 'confirm password is required',
        }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: 'confirm password does not match password',
        path: ['confirmPassword'],
    })

export const loginSchema = z.object({
    email: z.string({ required_error: 'name is required' }),
    password: z.string({ required_error: 'password is required' }),
})

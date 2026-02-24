import * as z from 'zod'
 
export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(2, { error: 'Username must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
})

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(2, { error: 'Username must be at least 2 characters long.' })
    .trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
    })
    .trim(),
    confirm_password: z.string().min(8, { error: 'Be at least 8 characters long' }),
    first_name: z.string().min(2, { error: 'First name must be at least 2 characters long.' }).trim(),
    last_name: z.string().min(2, { error: 'Last name must be at least 2 characters long.' }).trim(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match.',
})

export type RegisterFormState =
    | {
        errors?: {
          username?: string[]
          email?: string[]
            password?: string[]
            confirm_password?: string[]
            first_name?: string[]
            last_name?: string[]
        }
        message?: string
      }
    | undefined
 
export type LoginFormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
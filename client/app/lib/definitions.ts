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

export const ShippingAddressFormSchema = z.object({
  country: z.string().min(1, { message: 'Please select a country.' }),
  region: z.string().min(1, { message: 'Please select a region.' }),
  city: z.string().min(1, { message: 'Please select a city.' }),
  
  zip_code: z
    .string()
    .min(2, { message: 'Zip code is required.' })
    .max(10, { message: 'Zip code cannot exceed 10 characters.' })
    .trim(),
    
  phone_prefix: z
    .string()
    .max(4, { message: 'Prefix cannot exceed 4 characters.' })
    .optional(), 
    
  phone_number: z
    .string()
    .length(9, { message: 'Phone number must be exactly 9 characters long.' })
    .regex(/^[0-9]+$/, { message: 'Phone number can only contain digits.' })
    .trim(),
    
  street_name: z
    .string()
    .min(2, { message: 'Street name must be at least 2 characters long.' })
    .max(30, { message: 'Street name cannot exceed 30 characters.' })
    .trim(),
    
  street_number: z
    .string()
    .min(1, { message: 'Street number is required.' })
    .max(10, { message: 'Street number cannot exceed 10 characters.' })
    .trim(),
    
  is_default: z.boolean().default(false).optional(),
})

export type ShippingAddressFormState =
  | {
      errors?: {
        country?: string[]
        region?: string[]
        city?: string[]
        zip_code?: string[]
        phone_prefix?: string[]
        phone_number?: string[]
        street_name?: string[]
        street_number?: string[]
        is_default?: string[]
      }
      message?: string
    }
  | undefined

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
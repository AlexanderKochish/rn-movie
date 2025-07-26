import { z } from 'zod'

export const signUpSchema = z.object({
  username: z.string().trim().min(3).max(18),
  email: z.email().trim(),
  password: z.string().trim().min(6).max(18),
})

export type signUpSchemaType = z.infer<typeof signUpSchema>

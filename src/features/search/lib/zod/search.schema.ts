import { z } from 'zod'

export const searchSchema = z.object({
  search: z.string().trim(),
})

export type searchSchemaType = z.infer<typeof searchSchema>

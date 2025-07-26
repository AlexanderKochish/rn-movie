import { z } from 'zod'

export const ratingSchema = z.object({
  rating: z.number().min(0).max(10),
})

export type ratingSchemaType = z.infer<typeof ratingSchema>

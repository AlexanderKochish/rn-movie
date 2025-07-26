import { z } from 'zod'

export const reviewSchema = z.object({
  review: z.string().trim().min(1).max(200).optional(),
})

export type reviewSchemaType = z.infer<typeof reviewSchema>

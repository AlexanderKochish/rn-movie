import { z } from "zod";

export const accountSchema = z.object({
  username: z.string().max(20).optional(),
  age: z
    .preprocess((val) => Number(val), z.number().int().positive().max(120))
    .optional(),
  avatar: z.string().optional(),
  email: z.string(),
});

export type accountSchemaType = z.infer<typeof accountSchema>;

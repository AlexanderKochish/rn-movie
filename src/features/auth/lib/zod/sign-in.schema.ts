import { z } from "zod";

export const signInSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(6).max(18),
});

export type signInSchemaType = z.infer<typeof signInSchema>;

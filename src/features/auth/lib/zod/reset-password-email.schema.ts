import { z } from "zod";

export const resetPasswordEmail = z.object({
    email: z.string(),
});

export type resetPasswordFromEmailType = z.infer<typeof resetPasswordEmail>;

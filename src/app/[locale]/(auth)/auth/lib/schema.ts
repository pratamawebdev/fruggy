import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email atau username wajib diisi." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
});

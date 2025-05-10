import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email atau username wajib diisi." }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
});

export const signUpSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required." }),

    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email format." }),

    username: z
      .string()
      .min(8, { message: "Username must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Username must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Username must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Username must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Username must contain at least one special character.",
      }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character.",
      }),

    confirmPassword: z.string().min(1, {
      message: "Confirm password is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

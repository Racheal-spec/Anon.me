import { z } from "zod";

export const RegisterUserSchema = z.object({
  anonname: z
    .string({
      required_error: "An anonymous name is required",
      invalid_type_error: "Anonymous name must be a string",
    })
    .max(20),

  uniqueid: z
    .string({
      required_error: "A UniqueID is required",
    })
    .min(1, "UniqueID is required")
    .startsWith("Anon")
    .regex(/([0-9])\d+/g),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be more than 7 characters")
    .max(25, "Password must be less than 25 characters"),
  photo: z.string().optional(),
});

export const LoginUserSchema = z.object({
  uniqueid: z
    .string({
      required_error: "UniqueID is required",
      invalid_type_error: "UniqueID is invalid",
    })
    .min(1, "UniqueID is required"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

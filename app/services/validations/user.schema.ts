import { z } from "zod";

export const UserSchema = z.object({
  anonname: z
    .string({
      required_error: "An anonymous name is required",
      invalid_type_error: "Anonymous name must be a string",
    })
    .min(1, "Anonymous name is required")
    .max(20)
    .optional(),
  email: z
    .string({
      required_error: "A valid email is required",
    })
    .min(1, "An email is required")
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be more than 7 characters")
    .max(25, "Password must be less than 25 characters")
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => /[a-zA-Z]/.test(value), {
      message: "Password must contain at least one alphabet character",
    })
    // .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    //   message: "Password must contain at least one special character",
    // })
  ,
  photo: z.string().optional(),
  location: z
    .string({
      required_error: "Location is required",
    })
    .optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const MainUserSchema = z.object({
  anonname: z
    .string({
      required_error: "An anonymous name is required",
      invalid_type_error: "Anonymous name must be a string",
    })
    .min(1, "Anonymous name is required")
    .max(20)
    .startsWith("Anon")
    .optional(),
  password: z.string().optional(),
  email: z.string().optional(),
  photo: z.string().optional(),
  location: z.string().optional(),
});

export type ProfileUserSchema = z.infer<typeof MainUserSchema>;

export const decryptEmail = (obsfucatedemail: string) => {
  const originalEmail = obsfucatedemail
    ?.replace("&#64", "@")
    ?.replace("&#46", ".");
  return originalEmail;
};

// export const decodeObfuscatedEmail = (obfuscatedEmail: string) => {
//   const parts = obfuscatedEmail.split('@');

//   if (parts.length === 2) {
//     const obfuscatedUsername = parts[0];
//     const domain = parts[1];

//     const originalUsername = obfuscatedUsername.replace(/\*/g, '');

//     return `${originalUsername}@${domain}`;
//   }
  
//   return obfuscatedEmail;
// }
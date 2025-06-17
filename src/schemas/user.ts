import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "editor", "viewer"]),
  comment: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

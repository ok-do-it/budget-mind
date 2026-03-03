import { z } from "zod"

export const userRoleSchema = z.enum(["user", "admin"])

export const userSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  displayName: z.string().min(1),
  role: userRoleSchema.default("user"),
})

export type User = z.infer<typeof userSchema>

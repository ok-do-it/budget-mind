import { z } from "zod"

export const accountProviderSchema = z.enum(["manual", "plaid"])
export const accountTypeSchema = z.enum(["credit", "checking", "savings"])

export const accountSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  provider: accountProviderSchema,
  type: accountTypeSchema,
  name: z.string().min(1),
  currency: z.string().length(3).default("USD"),
})

export type Account = z.infer<typeof accountSchema>

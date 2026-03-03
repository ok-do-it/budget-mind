import { z } from "zod"

export const transactionSchema = z.object({
  accountId: z.string().min(1),
  description: z.string().min(1),
  amountCents: z.number().int(),
  currency: z.string().length(3).default("USD"),
  category: z.string().min(1),
  bookedAt: z.string().datetime(),
})

export type Transaction = z.infer<typeof transactionSchema>

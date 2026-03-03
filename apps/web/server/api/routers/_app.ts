import { transactionSchema, userSchema } from "@budget-mind/shared"
import { z } from "zod"
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"

const trackedTransactionSchema = transactionSchema.extend({
  id: z.string().min(1),
})

export const appRouter = createTRPCRouter({
  health: publicProcedure.query(() => {
    return {
      service: "budget-mind-web-trpc",
      status: "ok",
      timestamp: new Date().toISOString(),
    }
  }),
  viewer: protectedProcedure.output(userSchema).query(({ ctx }) => {
    return {
      id: ctx.userId,
      email: "placeholder@example.com",
      displayName: "Budget Mind User",
      role: "user",
    }
  }),
  transactions: publicProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(50).default(10),
      }),
    )
    .output(z.array(trackedTransactionSchema))
    .query(({ input }) => {
      const now = new Date().toISOString()

      return Array.from({ length: input.limit }, (_, index) => ({
        id: `txn-${index + 1}`,
        accountId: "demo-account",
        description: `Demo transaction ${index + 1}`,
        amountCents: 500 + index * 125,
        currency: "USD",
        category: "General",
        bookedAt: now,
      }))
    }),
})

export type AppRouter = typeof appRouter

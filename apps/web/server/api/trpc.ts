import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import type { TRPCContext } from "@/server/api/context"

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Sign in to access this resource.",
    })
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.auth.userId,
    },
  })
})

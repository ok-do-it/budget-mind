import { db } from "@budget-mind/db"
import { auth } from "@clerk/nextjs/server"

export async function createTRPCContext() {
  const authResult = await auth()

  return {
    auth: authResult,
    db,
  }
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

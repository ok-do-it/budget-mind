import { describe, expect, it } from "vitest"
import { appRouter } from "./_app"

describe("appRouter", () => {
  it("returns health payload", async () => {
    const caller = appRouter.createCaller({
      auth: {
        userId: null,
        sessionId: null,
        getToken: async () => null,
        has: () => false,
      },
      db: {} as never,
    } as never)

    const result = await caller.health()
    expect(result.status).toBe("ok")
  })
})

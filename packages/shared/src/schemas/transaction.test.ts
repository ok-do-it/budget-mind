import { describe, expect, it } from "vitest"
import { transactionSchema } from "./transaction"

describe("transactionSchema", () => {
  it("validates a transaction payload", () => {
    const parsed = transactionSchema.parse({
      accountId: "acc_1",
      description: "Coffee",
      amountCents: 450,
      currency: "USD",
      category: "Food",
      bookedAt: "2026-01-01T12:00:00.000Z",
    })

    expect(parsed.amountCents).toBe(450)
    expect(parsed.currency).toBe("USD")
  })
})

"use client"

import { Button } from "@budget-mind/ui/button"
import { Card } from "@budget-mind/ui/card"
import { useAuth } from "@clerk/nextjs"
import { trpc } from "@/trpc/react"

export function HomePage() {
  const { isSignedIn } = useAuth()

  const healthQuery = trpc.health.useQuery()
  const viewerQuery = trpc.viewer.useQuery(undefined, {
    enabled: Boolean(isSignedIn),
    retry: false,
  })
  const transactionsQuery = trpc.transactions.useQuery({
    limit: 5,
  })

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-8">
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">Budget Mind</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Next.js + tRPC scaffold is running
        </h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-medium">API health</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {healthQuery.data
              ? `${healthQuery.data.status} at ${healthQuery.data.timestamp}`
              : "Loading..."}
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-medium">Auth-aware route</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignedIn
              ? `Signed in as ${viewerQuery.data?.displayName ?? "loading..."}`
              : "Sign in to query protected procedures."}
          </p>
        </Card>
      </section>

      <Card className="space-y-3">
        <h2 className="text-lg font-medium">Sample transactions</h2>
        {transactionsQuery.data?.map((transaction) => (
          <div key={transaction.id} className="rounded-md border p-3 text-sm">
            <p className="font-medium">{transaction.description}</p>
            <p className="text-muted-foreground">
              ${(transaction.amountCents / 100).toFixed(2)}{" "}
              {transaction.currency}
            </p>
          </div>
        ))}
        <Button type="button" variant="secondary">
          Import statement (placeholder)
        </Button>
      </Card>
    </main>
  )
}

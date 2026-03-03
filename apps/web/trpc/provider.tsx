"use client"

import type { QueryClient } from "@tanstack/react-query"
import { httpBatchLink, loggerLink } from "@trpc/client"
import { useState } from "react"
import superjson from "superjson"
import { trpc } from "@/trpc/react"

type TrpcProviderProps = {
  children: React.ReactNode
  queryClient: QueryClient
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return ""
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
}

export function TrpcProvider({ children, queryClient }: TrpcProviderProps) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  )
}

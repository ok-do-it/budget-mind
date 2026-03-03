import { z } from "zod"

const dbEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .default("postgres://postgres:postgres@localhost:5432/budget_mind"),
})

export function parseDbEnv(env: NodeJS.ProcessEnv = process.env) {
  return dbEnvSchema.parse({
    DATABASE_URL: env.DATABASE_URL,
  })
}

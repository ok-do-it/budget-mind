import { createDb } from "./client"
import { parseDbEnv } from "./env"

export * from "./client"
export * from "./env"
export * from "./schema"

const env = parseDbEnv()

export const db = createDb(env.DATABASE_URL)

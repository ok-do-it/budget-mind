import { Kysely, PostgresDialect } from "kysely"
import pg from "pg"
import type { Database } from "./schema"

const { Pool } = pg

export function createDb(databaseUrl: string) {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: databaseUrl,
      }),
    }),
  })
}

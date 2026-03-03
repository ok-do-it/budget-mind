import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { FileMigrationProvider, Migrator } from "kysely"
import { createDb } from "./client"
import { parseDbEnv } from "./env"

async function run() {
  const direction = process.argv[2] ?? "up"
  const { DATABASE_URL } = parseDbEnv()
  const db = createDb(DATABASE_URL)

  const currentFilePath = fileURLToPath(import.meta.url)
  const currentDir = path.dirname(currentFilePath)
  const migrationFolder = path.join(currentDir, "../migrations")

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder,
    }),
  })

  const result =
    direction === "down"
      ? await migrator.migrateDown()
      : await migrator.migrateToLatest()

  if (result.error) {
    throw result.error
  }

  await db.destroy()
  console.info(`Migrations ${direction} completed.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})

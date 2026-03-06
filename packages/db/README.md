# `@budget-mind/db`

Database package for Budget Mind.  
It provides:

- typed Kysely schema definitions used by the app code
- database client creation (`pg` + Kysely Postgres dialect)
- environment parsing for DB connection config
- file-based Kysely migration runner and migration files

## Package Structure

- `src/index.ts`  
  Public entrypoint. Re-exports DB utilities/types and also creates a ready-to-use singleton `db` instance from `DATABASE_URL`.

- `src/client.ts`  
  Defines `createDb(databaseUrl)` and wires `Kysely<Database>` to the Postgres driver (`pg` Pool + `PostgresDialect`).

- `src/env.ts`  
  Validates and parses `DATABASE_URL` using Zod. Includes a default local URL (`postgres://postgres:postgres@localhost:5432/budget_mind`) for local development.

- `src/schema.ts`  
  Type-level DB contract for Kysely:
  - table shapes: `UserTable`, `AccountTable`, `TransactionTable`
  - root `Database` interface used as `Kysely<Database>`
  - convenience row helper types (`Selectable`, `Insertable`, `Updateable`) for users

- `src/migrate.ts`  
  CLI migration runner:
  - resolves migration folder from the current file path
  - builds `Migrator` with `FileMigrationProvider`
  - supports directions via CLI arg:
    - `up` (default): `migrateToLatest()`
    - `down`: `migrateDown()`
  - destroys DB connection on completion

- `src/migrations/0001_init.ts`  
  Initial migration (`up`/`down`) implemented in TypeScript with raw SQL via Kysely `sql` template helper.
  Creates/drops:
  - `users`
  - `accounts` (FK to `users`)
  - `transactions` (FK to `accounts`)

## How Migrations Work Here

1. `pnpm --filter @budget-mind/db migrate:up` runs `tsx src/migrate.ts up`.
2. `parseDbEnv()` reads/validates `DATABASE_URL`.
3. `createDb()` creates a typed Kysely client.
4. Kysely `Migrator` loads files from `src/migrations`.
5. Migration `up`/`down` functions execute SQL statements against Postgres.

## NPM Scripts

- `migrate:up` - apply pending migrations to latest
- `migrate:down` - roll back one migration step
- `typecheck` - run TypeScript checks
- `lint` / `format` - Biome checks and formatting

## Usage Patterns

- Use the package singleton when app code can rely on process env:
  - `import { db } from "@budget-mind/db"`
- Use `createDb(url)` when explicit connection lifecycle/control is needed (scripts, tests, special tooling).

## Notes

- Schema types in `schema.ts` are application-side TypeScript contracts; DB-level constraints are defined by migrations.
- Current migrations use SQL strings inside TypeScript files (instead of Kysely schema builder APIs), which keeps DDL explicit while staying inside Kysely's migration framework.

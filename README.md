# Budget Mind

Budget Mind is a monorepo for tracking and visualizing credit card transactions.
The scaffold is based on Next.js App Router with embedded tRPC, shared Zod contracts,
PostgreSQL with Kysely migrations, and reusable UI primitives.

## Stack

- Monorepo: pnpm + Turborepo
- App/API host: Next.js (`apps/web`)
- API contract: tRPC
- Validation: Zod (`packages/shared`)
- Database: PostgreSQL + Kysely (`packages/db`)
- Styling: Tailwind CSS + shadcn/ui-style primitives (`packages/ui`)
- Auth: Clerk
- Tooling: Biome, Husky, GitHub Actions
- Tests: Vitest + Playwright

## Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy environment file:

   ```bash
   cp .env.example .env
   ```

3. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

4. Run migrations:

   ```bash
   pnpm --filter @budget-mind/db migrate:up
   ```

5. Start development:

   ```bash
   pnpm dev
   ```

## Useful Commands

- `pnpm lint` - Biome checks
- `pnpm format` - Biome format write
- `pnpm typecheck` - Turbo typecheck
- `pnpm test` - Vitest via Turbo
- `pnpm test:e2e` - Playwright smoke test

## Scaffold Completion Checklist

- [x] Embedded tRPC route and React client provider in `apps/web`
- [x] Shared package for schemas/types/constants in `packages/shared`
- [x] Tailwind + reusable UI primitives wired into app
- [x] Kysely DB package with migration runner
- [x] Clerk middleware/context integration baseline
- [x] Biome, Husky, and CI scaffolding
- [x] Vitest + Playwright baseline tests

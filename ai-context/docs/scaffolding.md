# Budget Mind Scaffolding Guide

This document summarizes the scaffolding stack, installed libraries, and key files currently used in this repository.

## 1) Core stack

- Monorepo: `pnpm` + `Turborepo`
- App host: `Next.js` (`apps/web`)
- API layer: `tRPC` (embedded inside `apps/web`)
- Validation/contracts: `Zod` (`packages/shared`)
- Styling/UI: `Tailwind CSS v4` + shadcn-style setup + shared UI package
- Auth: `Clerk`
- Database: `PostgreSQL` + `Kysely`
- Quality/tooling: `Biome` + `Husky` + GitHub Actions
- Testing: `Vitest` + `Playwright`

## 2) Installed libraries

### Root runtime dependencies (`package.json`)

- `@clerk/nextjs`
- `@tanstack/react-query`
- `@trpc/client`
- `@trpc/react-query`
- `@trpc/server`
- `class-variance-authority`
- `clsx`
- `kysely`
- `pg`
- `superjson`
- `tailwind-merge`
- `zod`

### Root dev dependencies (`package.json`)

- `@biomejs/biome`
- `@playwright/test`
- `@tailwindcss/postcss`
- `husky`
- `tailwindcss`
- `tsx`
- `turbo`
- `typescript`
- `vitest`

### App/package-specific dependencies

- `apps/web/package.json`
  - `next`, `react`, `react-dom`
  - workspace deps: `@budget-mind/db`, `@budget-mind/shared`, `@budget-mind/ui`
- `packages/shared/package.json`
  - `zod`
- `packages/db/package.json`
  - `kysely`, `pg`, `zod`
  - dev: `@types/pg`, `tsx`
- `packages/ui/package.json`
  - `class-variance-authority`, `clsx`, `tailwind-merge`, `react`, `react-dom`

## 3) Workspace packages

- `apps/web` - Next.js app + embedded tRPC API
- `packages/shared` - shared schemas/types/constants
- `packages/db` - Kysely client, schema types, migrations runner
- `packages/ui` - reusable UI primitives and utility (`cn`)

## 4) Key files by concern

### API (tRPC in web app)

- `apps/web/server/api/context.ts` - request context (auth + db)
- `apps/web/server/api/trpc.ts` - tRPC init + public/protected procedures
- `apps/web/server/api/routers/_app.ts` - root app router
- `apps/web/app/api/trpc/[trpc]/route.ts` - Next route adapter for tRPC
- `apps/web/trpc/react.ts` - typed React tRPC hooks
- `apps/web/trpc/provider.tsx` - tRPC client + React Query provider bridge
- `apps/web/app/providers.tsx` - app-level providers composition

### Shared contracts (`packages/shared`)

- `packages/shared/src/schemas/user.ts`
- `packages/shared/src/schemas/account.ts`
- `packages/shared/src/schemas/transaction.ts`
- `packages/shared/src/types/index.ts`
- `packages/shared/src/constants/index.ts`
- `packages/shared/src/index.ts` (single export surface)

### Database (`packages/db`)

- `packages/db/src/schema.ts` - DB table typing
- `packages/db/src/client.ts` - Kysely + Postgres dialect creation
- `packages/db/src/env.ts` - DB env parsing/validation
- `packages/db/src/index.ts` - exported db instance
- `packages/db/src/migrate.ts` - migration CLI runner
- `packages/db/src/migrations/0001_init.ts` - initial schema migration

### UI + styling

- `apps/web/app/globals.css` - Tailwind v4 entry + theme tokens
- `apps/web/postcss.config.mjs` - Tailwind PostCSS plugin
- `apps/web/components.json` - shadcn-style config metadata
- `packages/ui/src/button.tsx`
- `packages/ui/src/card.tsx`
- `packages/ui/src/utils.ts`

### Auth (Clerk)

- `apps/web/middleware.ts` - Clerk middleware baseline
- `apps/web/app/layout.tsx` - `ClerkProvider` integration

### Quality, tests, CI

- `biome.json` - formatter/lint configuration
- `.husky/pre-commit` - pre-commit checks
- `.github/workflows/ci.yml` - CI pipeline
- `vitest.config.ts` - unit test config
- `playwright.config.ts` - e2e config
- `tests/e2e/smoke.spec.ts` - basic UI smoke test
- `apps/web/server/api/routers/app.test.ts` - API unit test
- `packages/shared/src/schemas/transaction.test.ts` - schema unit test

### Environment and infrastructure

- `.env.example` - required env variables template
- `docker-compose.yml` - local PostgreSQL service

## 5) Main commands

- `pnpm dev` - run workspace development tasks
- `pnpm lint` - run Biome checks
- `pnpm format` - format files with Biome
- `pnpm typecheck` - run Turbo typecheck pipeline
- `pnpm test` - run unit tests via Turbo
- `pnpm test:e2e` - run Playwright tests
- `pnpm --filter @budget-mind/db migrate:up` - apply DB migrations
- `pnpm --filter @budget-mind/db migrate:down` - rollback last migration

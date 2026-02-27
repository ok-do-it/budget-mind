A simple web app to use to track and visually represent in nice graphical way user's credit card transactions. 

Transactions stored in database
Sourced from manual statement upload or Plaid integration

Tech to use:

Monorepo:       pnpm + Turborepo (instead of yarn/lerna)
Backend:        NestJS
Frontend:       Next.js + React
Styling:        Tailwind + shadcn/ui
Database:       PostgreSQL + Kysely, Kysely migrations
Validation:     Zod (shared between frontend and backend)
Auth:           Auth.js or (Clerk / Auth0 if dont want to build)
Testing:        Vitest + Playwright
Linting:        Biome (or ESLint + Prettier)
API contract:   tRPC
Dev tooling:    Docker Compose, Husky, GitHub Actions
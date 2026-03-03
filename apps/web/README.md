# Web App (`apps/web`)

This app hosts both the UI and the tRPC API layer for Budget Mind.

## Local Development

```bash
cp ../../.env.example ../../.env
docker compose -f ../../docker-compose.yml up -d
pnpm --filter @budget-mind/db migrate:up
pnpm dev
```

Open `http://localhost:3000`.

## What is wired

- `app/api/trpc/[trpc]/route.ts` - tRPC route handler
- `server/api/*` - tRPC context/router/procedures
- `trpc/*` - React Query + tRPC client provider
- `middleware.ts` - Clerk middleware baseline
- `app/globals.css` - Tailwind v4 entry and tokens

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

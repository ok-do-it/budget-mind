# Plaid Sample Fast Index

This document is a fast navigation roadmap for `ai-context/docs/example-plaid-transaction-tracker`.
Use it when an agent needs to reuse or model Plaid integration behavior quickly.

## 1) What this sample is

- App type: transaction tracker with Plaid Link + Transactions Sync.
- Architecture: static frontend in `public/`, Express API in `server-js/`, separate webhook listener.
- Persistence: SQLite-backed storage via `server-js/db.js`.
- Best fit: flow and endpoint reference; not a production blueprint for auth/security.

## 2) Entry points

- `ai-context/docs/example-plaid-transaction-tracker/server-js/server.js`
  - Main API bootstrap and route registration.
- `ai-context/docs/example-plaid-transaction-tracker/server-js/webhookServer.js`
  - Webhook receiver and webhook-type dispatch.
- `ai-context/docs/example-plaid-transaction-tracker/public/index.html`
  - UI shell and browser script entrypoint (`public/js/client.js`).

## 3) Route and endpoint index

### `server-js/routes/users.js` (`/server/users`)

- `POST /create` - create user and set cookie session.
- `GET /list` - list users.
- `POST /sign_in` - sign in selected user.
- `POST /sign_out` - clear session cookie.
- `GET /get_my_info` - get current signed-in user.

### `server-js/routes/tokens.js` (`/server/tokens`)

- `POST /generate_link_token` - create Plaid Link token.
- `POST /exchange_public_token` - exchange public token, store item/access token, fetch metadata, trigger first sync.

### `server-js/routes/banks.js` (`/server/banks`)

- `GET /list` - list connected banks/items for current user.
- `POST /deactivate` - remove Plaid item access and deactivate local item.

### `server-js/routes/transactions.js` (`/server/transactions`)

- `POST /sync` - sync transactions for all user items.
- `GET /list` - read transactions from local DB.

### `server-js/routes/debug.js` (`/server/debug`)

- `POST /run` - sample debug endpoint.
- `POST /generate_webhook` - sandbox webhook trigger helper.

### `server-js/webhookServer.js`

- `POST /server/receive_webhook` - webhook endpoint (separate server/port).

## 4) Core reusable flows

### Plaid Link onboarding flow

1. `POST /server/tokens/generate_link_token`
2. Client opens Plaid Link from `public/js/link.js`
3. `POST /server/tokens/exchange_public_token`
4. Server saves item/access token, enriches bank/account metadata, then runs initial `syncTransactions(item_id)`

### Transactions Sync flow (high reuse value)

Source: `server-js/routes/transactions.js`

1. Load item access token and stored cursor from DB.
2. Pull paginated updates with `transactionsSync` in `fetchNewSyncData`.
3. Apply `added`, `modified`, and `removed` changes to DB.
4. Save `next_cursor` for the item.

### Webhook update flow

Source: `server-js/webhookServer.js`

1. Receive Plaid webhook on `/server/receive_webhook`.
2. For `TRANSACTIONS` + `SYNC_UPDATES_AVAILABLE`, call `syncTransactions(item_id)`.

## 5) Frontend action map

### `public/js/client.js`

- Connect bank -> starts `startLink()` (`public/js/link.js`).
- Server refresh -> `POST /server/transactions/sync`.
- Client refresh -> `GET /server/transactions/list?maxCount=50`.
- Generate webhook -> `POST /server/debug/generate_webhook`.
- Deactivate bank -> `POST /server/banks/deactivate`.

### `public/js/link.js`

- Fetch link token -> `POST /server/tokens/generate_link_token`.
- Exchange public token -> `POST /server/tokens/exchange_public_token`.

### `public/js/signin.js`

- Account/session operations -> `users` endpoints (`create`, `list`, `sign_in`, `sign_out`, `get_my_info`).

## 6) Read this first (agent order)

1. `server-js/server.js` (wiring and route topology)
2. `server-js/routes/tokens.js` (Link + item bootstrap)
3. `server-js/routes/transactions.js` (core sync logic)
4. `server-js/webhookServer.js`
5. `server-js/db.js`(persistence behavior and cursor storage)
6. `public/js/link.js` and `public/js/client.js`  (client interaction flow)

## 7) Copy-first checklist

- Link token + public token exchange contract: `routes/tokens.js` + `public/js/link.js`
- Cursor-based transaction sync loop: `routes/transactions.js`
- Webhook-to-sync trigger path: `webhookServer.js`
- Plaid transaction normalization model: `simpleTransactionObject.js`
- Bank/account metadata persistence: `db.js` + `routes/tokens.js`

import type { Kysely } from "kysely"
import { sql } from "kysely"

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
    create table if not exists users (
      id text primary key,
      clerk_user_id text not null unique,
      email text not null,
      display_name text not null,
      role text not null default 'user',
      created_at timestamptz not null default now()
    );
  `.execute(db)

  await sql`
    create table if not exists accounts (
      id text primary key,
      user_id text not null references users(id) on delete cascade,
      name text not null,
      provider text not null,
      type text not null,
      currency text not null default 'USD',
      created_at timestamptz not null default now()
    );
  `.execute(db)

  await sql`
    create table if not exists transactions (
      id text primary key,
      account_id text not null references accounts(id) on delete cascade,
      description text not null,
      amount_cents integer not null,
      currency text not null default 'USD',
      category text not null,
      booked_at timestamptz not null,
      created_at timestamptz not null default now()
    );
  `.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`drop table if exists transactions;`.execute(db)
  await sql`drop table if exists accounts;`.execute(db)
  await sql`drop table if exists users;`.execute(db)
}

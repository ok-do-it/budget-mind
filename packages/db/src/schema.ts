import type { Generated, Insertable, Selectable, Updateable } from "kysely"

export type UserTable = {
  id: string
  clerk_user_id: string
  email: string
  display_name: string
  role: "user" | "admin"
  created_at: Generated<Date>
}

export type AccountTable = {
  id: string
  user_id: string
  name: string
  provider: "manual" | "plaid"
  type: "credit" | "checking" | "savings"
  currency: string
  created_at: Generated<Date>
}

export type TransactionTable = {
  id: string
  account_id: string
  description: string
  amount_cents: number
  currency: string
  category: string
  booked_at: Date
  created_at: Generated<Date>
}

export interface Database {
  users: UserTable
  accounts: AccountTable
  transactions: TransactionTable
}

export type UserRow = Selectable<UserTable>
export type NewUserRow = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({autoIncrement: true}),
  username: text().notNull().unique(),
  password: text().notNull(),
  role: text().notNull(),
})

export const subscriptionsTable = sqliteTable("subscriptions_table", {
  id: int().primaryKey({autoIncrement: true}),

  // foreign key → user who owns this subscription
  userId: int()
    .notNull()
    .references(() => usersTable.id, {onDelete: "cascade"}),

  endpoint: text().notNull().unique(),
  expirationTime: int(),
  p256dh: text().notNull(),
  auth: text().notNull(),
  userAgent: text(),
  createdAt: text().default("CURRENT_TIMESTAMP"),
});
import { pgTable, serial, text, date, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const leaves = pgTable("leaves", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id),
  date: date("date").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow(),
});

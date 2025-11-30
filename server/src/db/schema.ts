
import { pgTable, serial, text, date, timestamp, integer, } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("employee"),
});

export const leaves = pgTable("leaves", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  date: date("date").notNull(),
  reason: text("reason"),
  remarks: text("remarks").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

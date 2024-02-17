import {createId} from "@paralleldrive/cuid2";
import { serial, text, timestamp, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_enum", ["costumer", "manager"])

export const users = pgTable("users", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: userRoleEnum("role").notNull().default("costumer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
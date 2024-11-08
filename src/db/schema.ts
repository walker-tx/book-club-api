import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
  },
  (table) => [index("email_index").on(table.email)]
);

export const userRelations = relations(users, ({ many }) => ({
  usersToBooks: many(usersToBooks),
}));

export const books = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  isbn10: varchar({ length: 10 }).notNull().unique(),
  author: varchar({ length: 255 }).notNull(),
});

export const bookRelations = relations(books, ({ many }) => ({
  usersToBooks: many(usersToBooks),
}));

export const usersToBooks = pgTable(
  "users_to_books",
  {
    userId: integer()
      .notNull()
      .references(() => users.id),
    bookId: integer()
      .notNull()
      .references(() => books.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.bookId] })]
);

export const usersToBooksRelations = relations(usersToBooks, ({ one }) => ({
  user: one(users),
  book: one(books),
}));

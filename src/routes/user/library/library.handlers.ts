import type { RouteHandler } from "@hono/zod-openapi";
import { and, asc, count, eq } from "drizzle-orm";
import { db, usersToBooks, books } from "../../../db/index.js";
import type { ListUserBooksRoute, AddUserBookRoute } from "./library.routes.js";
import { createPaginatedResponseJson } from "../../../lib/pagination.js";

export const list: RouteHandler<ListUserBooksRoute> = async (ctx) => {
  const { limit, offset } = ctx.req.valid("query");
  const { userId } = ctx.req.valid("param");

  const librarySize = await db
    .select({ count: count() })
    .from(usersToBooks)
    .where(eq(usersToBooks.userId, userId));

  const userBooks = await db.query.usersToBooks.findMany({
    where: eq(usersToBooks.userId, userId),
    with: { book: true },
    limit,
    offset,
    orderBy: asc(books.id),
  });

  if (userBooks.length === 0) {
    return ctx.json(
      { code: 404, message: "User not found or no books found" },
      404
    );
  }

  return ctx.json(
    createPaginatedResponseJson(
      ctx.req.url,
      limit,
      offset,
      librarySize[0].count,
      userBooks.map((ub) => ub.book)
    ),
    200
  );
};

export const add: RouteHandler<AddUserBookRoute> = async (ctx) => {
  const { userId } = ctx.req.valid("param");
  const { bookId } = ctx.req.valid("json");

  const existingUserBook = await db.query.usersToBooks.findFirst({
    where: and(
      eq(usersToBooks.userId, userId),
      eq(usersToBooks.bookId, bookId)
    ),
  });

  if (existingUserBook) {
    return ctx.json({ code: 409, message: "Book already added to user" }, 409);
  }

  const insertedUserBook = await db
    .insert(usersToBooks)
    .values({ userId, bookId })
    .returning();

  return ctx.newResponse(null, 201);
};

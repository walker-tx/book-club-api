import { type RouteHandler } from "@hono/zod-openapi";
import { asc, count, eq } from "drizzle-orm";
import { books, db } from "../../db/index.js";
import type {
  CreateRoute,
  DeleteRoute,
  GetOneRoute,
  ListRoute,
} from "./book.routes.js";

export const list: RouteHandler<ListRoute> = async (ctx) => {
  const { limit, offset } = ctx.req.valid("query");

  const countResult = await db.select({ count: count() }).from(books);
  const bookCount = countResult[0].count;

  if (offset > bookCount) {
    return ctx.json({ code: 400, message: "Offset is out of range" }, 400);
  }

  const results = await db
    .select()
    .from(books)
    .orderBy(asc(books.id))
    .limit(limit)
    .offset(offset);

  return ctx.json(
    {
      limit,
      offset,
      get next() {
        if (offset + limit >= bookCount) return null;
        const url = new URL(ctx.req.url);
        url.searchParams.set("limit", String(limit));
        url.searchParams.set("offset", String(offset + limit));
        return url.toString();
      },
      get previous() {
        if (offset - limit < 0) return null;
        const nextUrl = new URL(ctx.req.url);
        nextUrl.searchParams.set("limit", String(limit));
        nextUrl.searchParams.set("offset", String(offset - limit));
        return nextUrl.toString();
      },
      results,
    },
    200
  );
};

export const getOne: RouteHandler<GetOneRoute> = async (ctx) => {
  const { id } = ctx.req.valid("param");
  const book = await db.query.books.findFirst({ where: eq(books.id, id) });

  if (!book) {
    return ctx.json({ code: 404, message: "Book not found" }, 404);
  }

  return ctx.json(book, 200);
};

export const create: RouteHandler<CreateRoute> = async (ctx) => {
  const newBook = ctx.req.valid("json");
  await db.insert(books).values(newBook).execute();
  return ctx.newResponse(null, 201);
};

export const _delete: RouteHandler<DeleteRoute> = async (ctx) => {
  const { id } = ctx.req.valid("param");
  const result = await db.delete(books).where(eq(books.id, id)).execute();

  if (result.rowCount === 0) {
    return ctx.json({ code: 404, message: "Book not found" }, 404);
  }

  return ctx.newResponse(null, 200);
};

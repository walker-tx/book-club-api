import { type RouteHandler } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { users, db } from "../../db/index.js";
import type { GetOneRoute } from "./user.routes.js";

export const getOne: RouteHandler<GetOneRoute> = async (ctx) => {
  const { id } = ctx.req.valid("param");
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });

  if (!user) {
    return ctx.json({ code: 404, message: "User not found" }, 404);
  }

  return ctx.json(user, 200);
};

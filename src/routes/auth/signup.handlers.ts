import type { RouteHandler } from "@hono/zod-openapi";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db, users } from "../../db/index.js";
import type { SignupRoute } from "./signup.routes.js";

export const signup: RouteHandler<SignupRoute> = async (ctx) => {
  const { username, email, password } = ctx.req.valid("json");
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return ctx.json({ code: 409, error: "That email is already in use" }, 400);
  }

  const hashedPw = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    email,
    username,
    password: hashedPw,
  });

  return ctx.newResponse(null, 201);
};

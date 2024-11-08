import bcrypt from "bcrypt";
import type { RouteHandler } from "@hono/zod-openapi";
import type { SignupRoute } from "./signup.routes.js";
import { db, users } from "../../db/index.js";
import { eq } from "drizzle-orm";

export const signup: RouteHandler<SignupRoute> = async (ctx) => {
  const { username, email, password } = ctx.req.valid("json");
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return ctx.json({ code: 409, error: "That email is already in use" }, 400);
  }

  const hashedPw = await bcrypt.hash(password, 10);

  const x = await db.insert(users).values({
    email,
    username,
    password: hashedPw,
  });

  console.log({ x });

  return ctx.newResponse(null, 201);
};

import type { RouteHandler } from "@hono/zod-openapi";
import type { LoginRoute } from "./login.routes.js";
import { db, users } from "../../db/index.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

export const login: RouteHandler<LoginRoute> = async (ctx) => {
  const { email, password } = ctx.req.valid("json");

  const foundUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!foundUser) {
    return ctx.json(
      { code: 401, message: "Invalid email/password combination" },
      404
    );
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) {
    return ctx.json(
      { code: 401, message: "Invalid email/password combination" },
      401
    );
  }

  const token = await sign(
    {
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_SECRET!
  );

  return ctx.json({ token }, 200);
};

import { verify } from "hono/jwt";
import type { MiddlewareHandler } from "hono/types";

export const validateBearerAuth: MiddlewareHandler = async (ctx, next) => {
  const authHeader = ctx.req.header("authorization");

  if (!authHeader) {
    return ctx.json(
      { code: 401, message: "Use of this service requires a bearer token." },
      { status: 401 }
    );
  }

  const [prefix, token] = authHeader?.split(" ");

  if (prefix !== "Bearer" || !token) {
    return ctx.json(
      { code: 401, message: "Invalid authorization header" },
      { status: 401 }
    );
  }

  try {
    const results = await verify(token, process.env.JWT_SECRET!);
    console.log({ results });
  } catch {
    return ctx.json({ code: 401, message: "Invalid token." }, { status: 401 });
  }

  await next();
};

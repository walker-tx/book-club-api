import { verify } from "hono/jwt";
import type { MiddlewareHandler, Env } from "hono/types";
import { JWTPayload } from "hono/utils/jwt/types";

type ValidationBearerAuthMiddlewareHandler = MiddlewareHandler<
  Env & { jwtPaylod: JWTPayload }
>;

export const validateBearerAuth: ValidationBearerAuthMiddlewareHandler = async (
  ctx,
  next,
) => {
  const authHeader = ctx.req.header("authorization");

  if (!authHeader) {
    return ctx.json(
      { code: 401, message: "Use of this service requires a bearer token." },
      { status: 401 },
    );
  }

  const [prefix, token] = authHeader.split(" ");

  if (prefix !== "Bearer" || !token) {
    return ctx.json(
      { code: 401, message: "Invalid authorization header" },
      { status: 401 },
    );
  }

  try {
    const results = await verify(token, process.env.JWT_SECRET!);
    ctx.set("jwtPayload", results);
  } catch {
    return ctx.json({ code: 401, message: "Invalid token." }, { status: 401 });
  }

  await next();
};

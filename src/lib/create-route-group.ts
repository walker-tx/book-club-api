import { OpenAPIHono } from "@hono/zod-openapi";
import { formatZodError } from "./errors.js";

export function createRouteGroup() {
  return new OpenAPIHono({
    defaultHook(result, ctx) {
      if (!result.success) {
        return ctx.json(
          { code: 400, message: formatZodError(result.error) },
          400,
        );
      }
    },
  });
}

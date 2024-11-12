import { z } from "@hono/zod-openapi";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { MiddlewareHandler } from "hono/types";
import { db } from "../../db/index.js";
import { ErrorSchema } from "../errors.js";

export const validateApiKey: MiddlewareHandler = async (ctx, next) => {
  const appId = ctx.req.header("x-app-id");
  const apiKey = ctx.req.header("x-api-key");

  if (!appId || !apiKey) {
    return ctx.json<z.infer<typeof ErrorSchema>>(
      { code: 401, message: "Use of this service requires an API ID and Key." },
      { status: 401 },
    );
  }

  const apiKeyRecord = await db.query.apiKeys.findFirst({
    where: (table) => eq(table.appId, appId),
  });

  if (!apiKeyRecord) {
    return ctx.json<z.infer<typeof ErrorSchema>>(
      { code: 401, message: "Invalid API ID." },
      { status: 401 },
    );
  }

  const isValid = await bcrypt.compare(apiKey, apiKeyRecord.key);

  if (!isValid) {
    return ctx.json<z.infer<typeof ErrorSchema>>(
      { code: 401, message: "Invalid API Key." },
      { status: 401 },
    );
  }

  await next();
};

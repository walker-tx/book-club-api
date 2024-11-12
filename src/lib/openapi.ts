import type { z } from "@hono/zod-openapi";

const mainServerUrl = process.env.VERCEL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api`
  : "http://localhost:3000/api";

export const openApiConfig = {
  openapi: "3.0.0",
  servers: [{ url: mainServerUrl }],
  info: { version: "1.0.0", title: "Book API" },
  tags: [
    { name: "Book" },
    { name: "Auth" },
    { name: "User" },
    { name: "Library" },
  ],
  "x-speakeasy-retries": {
    strategy: "backoff",
    backoff: {
      initialInterval: 500,
      maxInterval: 60000,
      maxElapsedTime: 3600000,
      exponent: 1.5,
    },
    statusCodes: ["5XX"],
    retryConnectionErrors: true,
  },
};

export function getExampleFromComponentSchema<T extends z.ZodTypeAny>(
  componentSchema: T,
): z.infer<T> {
  const example = componentSchema._def.openapi?.metadata?.example;
  if (!example) throw new Error("Schema must have an example");

  return example;
}

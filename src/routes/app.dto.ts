import { z } from "@hono/zod-openapi";

export const IdParamsSchema = z.object({
  id: z.coerce.number().gt(0).openapi({ example: 123 }),
});

export const AuthorizedHeaderSchema = z.object({
  authorization: z
    .string()
    .startsWith("Bearer ")
    .min(8)
    .max(255)
    .openapi({ example: "eyJ..." }),
  "x-api-key": z
    .string()
    .min(8)
    .max(255)
    .optional()
    .openapi({ example: "REALLY_LONG_RANDOM_STRING" }),
  "x-app-id": z.string().uuid().optional().openapi({ example: "SOME_UUID" }),
});

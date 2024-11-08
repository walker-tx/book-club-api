import { z } from "@hono/zod-openapi";

export const IdParamsSchema = z.object({
  id: z.coerce.number().gt(0).openapi({ example: 123 }),
});

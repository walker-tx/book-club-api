import { z } from "@hono/zod-openapi";
import { createPaginationResponseSchema } from "../../lib/pagination.js";
import { getExampleFromComponentSchema } from "../../lib/openapi.js";

export const BookSchema = z
  .object({
    id: z.number(),
    title: z.string().min(1),
    author: z.string().min(1),
    isbn10: z.string().length(10),
  })
  .openapi({
    example: {
      id: 1,
      title: "Frankenstein",
      author: "Mary Shelley",
      isbn10: "1234567890",
    },
  })
  .openapi("Book");

export const PaginatedBookResponseSchema =
  createPaginationResponseSchema(BookSchema);

export const CreateBookRequestBody = BookSchema.omit({ id: true }).openapi({
  example: {
    title: "Frankenstein",
    author: "Mary Shelley",
    isbn10: "0143131842",
  },
});

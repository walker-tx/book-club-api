import { z } from "@hono/zod-openapi";
import { createPaginationResponseSchema } from "../../../lib/pagination.js";
import { BookSchema } from "../../book/book.dto.js";

export const UserIdParamsSchema = z.object({
  userId: z.coerce.number().gt(0).openapi({ example: 123 }),
});

export const PaginatedLibraryResponseSchema = createPaginationResponseSchema(
  BookSchema.nullable()
);

export const AddRequestBody = z.object({
  bookId: z.coerce.number().gt(0),
});

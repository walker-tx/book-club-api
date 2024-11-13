import { createRoute } from "@hono/zod-openapi";
import { ErrorSchema } from "../../lib/errors.js";
import { getExampleFromComponentSchema } from "../../lib/openapi.js";
import {
  paginationMixin,
  PaginationRequestQuerySchema,
} from "../../lib/pagination.js";
import { securityMixins } from "../../lib/security.js";
import { IdParamsSchema } from "../app.dto.js";
import {
  BookSchema,
  CreateBookRequestBody,
  PaginatedBookResponseSchema,
} from "./book.dto.js";

export const list = createRoute({
  description: "List all books",
  tags: ["Book"],
  path: "/",
  method: "get",
  operationId: "listBooks",
  "x-speakeasy-name-override": "list",
  request: {
    query: PaginationRequestQuerySchema,
  },
  responses: {
    200: {
      description: "Books found",
      content: {
        "application/json": {
          schema: PaginatedBookResponseSchema,
          example: getExampleFromComponentSchema(PaginatedBookResponseSchema),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
  ...paginationMixin,
  ...securityMixins,
});

export const getOne = createRoute({
  description: "Get a book by ID",
  tags: ["Book"],
  path: "/{id}",
  method: "get",
  operationId: "getBook",
  "x-speakeasy-name-override": "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      description: "Books found",
      content: {
        "application/json": {
          schema: BookSchema,
          example: getExampleFromComponentSchema(BookSchema),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "Book not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
  ...securityMixins,
});

export const create = createRoute({
  description: "Create a book",
  tags: ["Book"],
  path: "/",
  method: "post",
  operationId: "createBook",
  "x-speakeasy-name-override": "create",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateBookRequestBody,
          example: getExampleFromComponentSchema(CreateBookRequestBody),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Book created",
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
  ...securityMixins,
});

export const _delete = createRoute({
  description: "Delete a book",
  tags: ["Book"],
  path: "/{id}",
  method: "delete",
  operationId: "deleteBook",
  "x-speakeasy-name-override": "delete",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      description: "Book deleted",
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: "Book not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
  ...securityMixins,
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type CreateRoute = typeof create;
export type DeleteRoute = typeof _delete;

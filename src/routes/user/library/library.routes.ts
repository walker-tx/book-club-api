import { createRoute, z } from "@hono/zod-openapi";
import { ErrorSchema } from "../../../lib/errors.js";
import {
  paginationMixin,
  PaginationRequestQuerySchema,
} from "../../../lib/pagination.js";
import {
  AddRequestBody,
  PaginatedLibraryResponseSchema,
  UserIdParamsSchema,
} from "./library.dto.js";

export const get = createRoute({
  description: "List books by user",
  tags: ["Library"],
  path: "/",
  method: "get",
  operationId: "getUserLibrary",
  "x-speakeasy-name-override": "get",
  request: {
    params: UserIdParamsSchema,
    query: PaginationRequestQuerySchema,
  },
  responses: {
    200: {
      description: "Books found",
      content: {
        "application/json": {
          schema: PaginatedLibraryResponseSchema,
          example: {
            next: "https://api.example.com/endpoint?limit=10&offset=10",
            previous: null,
            results: [
              {
                id: 123,
                title: "Frankenstein",
                author: "Mary Shelley",
                isbn10: "1234567890",
              },
            ],
          } satisfies z.infer<typeof PaginatedLibraryResponseSchema>,
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
      description: "User not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
  ...paginationMixin,
});

export const add = createRoute({
  description: "Add book to user library",
  tags: ["Library"],
  path: "/",
  method: "post",
  operationId: "addBookToUserLibrary",
  "x-speakeasy-name-override": "add",
  request: {
    params: UserIdParamsSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: AddRequestBody,
          example: {
            bookId: 123,
          } satisfies z.infer<typeof AddRequestBody>,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Book added to user",
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
      description: "User or book not found",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
    409: {
      description: "Book already added to user",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});

export type ListUserBooksRoute = typeof get;
export type AddUserBookRoute = typeof add;

import { createRoute } from "@hono/zod-openapi";
import { ErrorSchema } from "../../lib/errors.js";
import { IdParamsSchema } from "../app.dto.js";
import { UserSchema } from "./user.dto.js";

export const getOne = createRoute({
  description: "Get a user by ID",
  tags: ["User"],
  path: "/{id}",
  method: "get",
  operationId: "getUser",
  "x-speakeasy-name-override": "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      description: "User found",
      content: {
        "application/json": {
          schema: UserSchema,
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
});

export type GetOneRoute = typeof getOne;

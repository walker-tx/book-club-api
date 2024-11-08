import { createRoute } from "@hono/zod-openapi";
import { ErrorSchema } from "../../lib/errors.js";
import { LoginRequestBody, LoginResponse } from "./login.dto.js";

export const login = createRoute({
  description: "Log in",
  tags: ["Auth"],
  method: "post",
  path: "/",
  operationId: "login",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: LoginRequestBody,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User logged in",
      content: {
        "application/json": { schema: LoginResponse },
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
    401: {
      description: "Invalid credentials",
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

export type LoginRoute = typeof login;

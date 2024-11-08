import { createRoute } from "@hono/zod-openapi";
import { ErrorSchema } from "../../lib/errors.js";
import { SignupRequestBody } from "./signup.dto.js";

export const signup = createRoute({
  description: "Sign up",
  tags: ["Auth"],
  method: "post",
  path: "/",
  operationId: "signup",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: SignupRequestBody,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
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
});

export type SignupRoute = typeof signup;

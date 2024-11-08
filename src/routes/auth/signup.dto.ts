import { z } from "@hono/zod-openapi";

export const SignupRequestBody = z
  .object({
    username: z.string().min(1).max(255).openapi({ example: "jdoe123" }),
    email: z.string().email().openapi({ example: "jdoe123@email.com" }),
    password: z.string().min(8).openapi({ example: "mrg.qka5awy2jya*FTK" }),
  })
  .openapi({
    example: {
      username: "jdoe123",
      email: "jdoe123@email.com",
      password: "mrg.qka5awy2jya*FTK",
    },
  });

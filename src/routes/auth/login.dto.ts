import { z } from "@hono/zod-openapi";

export const LoginRequestBody = z
  .object({
    email: z.string().email().openapi({ example: "jdoe123@email.com" }),
    password: z.string().min(8).openapi({ example: "mrg.qka5awy2jya*FTK" }),
  })
  .openapi({
    example: {
      email: "jdoe123@email.com",
      password: "mrg.qka5awy2jya*FTK",
    },
  });

export const LoginResponse = z
  .object({
    token: z.string().openapi({ example: "eyJhbGciO..." }),
  })
  .openapi({
    example: {
      token: "eyJhbGci...",
    },
  });

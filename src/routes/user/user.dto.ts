import { z } from "@hono/zod-openapi";

export const UserSchema = z
  .object({
    id: z.number(),
    username: z.string().min(1),
    email: z.string().email(),
  })
  .openapi({
    example: {
      id: 1,
      username: "john_doe",
      email: "john_doe@example.com",
    },
  })
  .openapi("User");

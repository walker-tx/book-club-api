import { z } from "@hono/zod-openapi";

export const ErrorSchema = z
  .object({
    code: z.number(),
    message: z.string(),
  })
  .openapi({ example: { code: 400, message: "Bad Request" } })
  .openapi("Error");

export function formatZodError(error: z.ZodError): string {
  if (!error.errors.length) return "";

  const errorMessages = error.errors.map((err) => {
    // Get the field path from the error
    const field = err.path[err.path.length - 1];
    // Get the error message
    const message = err.message;

    return `${message} at "${field}"`;
  });

  return `Validation error: ${errorMessages.join("; ")}`;
}

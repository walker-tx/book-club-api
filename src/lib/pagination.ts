import { z } from "@hono/zod-openapi";

export const PaginationRequestQuerySchema = z.object({
  limit: z.coerce.number().int().gt(1).default(10).openapi({ example: 10 }),
  offset: z.coerce.number().int().gte(0).default(0).openapi({ example: 0 }),
});

const GenericPaginatedResponseSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.unknown()),
});

export function createPaginationResponseSchema<T extends z.ZodTypeAny>(
  schema: T
) {
  const schemaName = schema._def.openapi?._internal?.refId;
  const example = schema._def.openapi?.metadata?.example;

  if (!schemaName) {
    throw new Error(
      "Schema must have an openapi definition that includes a schema name and example"
    );
  }

  return GenericPaginatedResponseSchema.merge(
    z.object({ results: z.array(schema) })
  )
    .openapi({
      example: {
        next: "https://api.example.com/endpoint?limit=10&offset=10",
        previous: null,
        results: [example],
      },
    })
    .openapi(`Paginated${schemaName}Response`);
}

export function createPaginatedResponseJson<TData>(
  url: string | URL,
  limit: number,
  offset: number,
  totalCount: number,
  results: TData[]
) {
  let next: string | null = null;
  if (offset + limit < totalCount) {
    const nextUrl = new URL(url.toString());
    nextUrl.searchParams.set("limit", String(limit));
    nextUrl.searchParams.set("offset", String(offset + limit));
    next = nextUrl.toString();
  }

  let previous: string | null = null;
  if (offset - limit >= 0) {
    const prevUrl = new URL(url.toString());
    prevUrl.searchParams.set("limit", String(limit));
    prevUrl.searchParams.set("offset", String(offset - limit));
    previous = prevUrl.toString();
  }

  return {
    limit,
    offset,
    next,
    previous,
    results,
  };
}

export const paginationMixin = {
  "x-speakeasy-pagination": {
    type: "offsetLimit",
    inputs: [
      {
        name: "offset",
        in: "parameters",
        type: "offset",
      },
    ],
    outputs: {
      results: "$.results",
    },
  },
};

import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";

export type AppRouteHandler<TRouteConfig extends RouteConfig> =
  RouteHandler<TRouteConfig>;

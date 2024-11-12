import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { openApiConfig } from "../lib/openapi.js";
import authRouteGroup from "./auth/index.js";
import bookRouteGroup from "./book/index.js";
import userRouteGroup from "./user/index.js";

const app = new OpenAPIHono();

app.openAPIRegistry.registerComponent("securitySchemes", "BearerAuth", {
  description: "Bearer token received through un/pw auth",
  type: "http",
  scheme: "bearer",
});

app.openAPIRegistry.registerComponent("securitySchemes", "ApiKeyAuth", {
  description: "API key",
  type: "apiKey",
  in: "header",
  name: "X-API-KEY",
});

app.openAPIRegistry.registerComponent("securitySchemes", "AppIdAuth", {
  description: "App ID",
  type: "apiKey",
  in: "header",
  name: "X-APP-ID",
});

app.use("/*", logger());

// app.use(
//   "^(?!/(docs|swagger)).*$",
//   bearerAuth({
//     verifyToken: (token, ctx) => {
//       console.log({ token });
//       return true;
//     },
//   })
// );

app.route("/book", bookRouteGroup);
app.route("/auth", authRouteGroup);
app.route("/user", userRouteGroup);

app.doc("/docs", {
  ...openApiConfig,
  security: [
    {
      AppIdAuth: [],
      ApiKeyAuth: [],
    },
    { BearerAuth: [] },
  ],
});

app.get("swagger", swaggerUI({ url: "/api/docs" }));

export default app;

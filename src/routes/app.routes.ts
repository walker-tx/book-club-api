import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { openApiConfig } from "../lib/openapi.js";
import authRouteGroup from "./auth/index.js";
import bookRouteGroup from "./book/index.js";
import userRouteGroup from "./user/index.js";
import { logger } from "hono/logger";

const app = new OpenAPIHono();

app.use("/*", logger());

app.route("/book", bookRouteGroup);
app.route("/auth", authRouteGroup);
app.route("/user", userRouteGroup);

app.doc("/docs", openApiConfig);

app.get("swagger", swaggerUI({ url: "/api/docs" }));

export default app;

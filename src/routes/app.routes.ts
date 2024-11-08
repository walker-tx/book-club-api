import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { openApiConfig } from "../lib/openapi.js";
import { authRouteGroup } from "./auth/index.js";
import bookRouteGroup from "./book/index.js";
import userRouteGroup from "./user/index.js";

const app = new OpenAPIHono();

app.route("/book", bookRouteGroup);
app.route("/auth", authRouteGroup);
app.route("/user", userRouteGroup);

app.doc("/docs", openApiConfig);

app.get("swagger", swaggerUI({ url: "/docs" }));

export default app;

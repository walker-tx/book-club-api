import { handle } from "@hono/node-server/vercel";
import { OpenAPIHono } from "@hono/zod-openapi";
import app from "../src/routes/app.routes.js";

// I honestly don't know if this does anything...
export const config = {
  api: {
    bodyParser: false,
  },
};

const vercelApp = new OpenAPIHono().basePath("/api");

vercelApp.route("/", app);

export default handle(vercelApp);

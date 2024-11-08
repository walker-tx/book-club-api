import { createRouteGroup } from "../../lib/create-route-group.js";
import * as routes from "./login.routes.js";
import * as handlers from "./login.handlers.js";

export const loginRouteGroup = createRouteGroup().openapi(
  routes.login,
  handlers.login
);

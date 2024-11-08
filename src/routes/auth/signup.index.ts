import { createRouteGroup } from "../../lib/create-route-group.js";
import * as routes from "./signup.routes.js";
import * as handlers from "./signup.handlers.js";

export const signupRouteGroup = createRouteGroup().openapi(
  routes.signup,
  handlers.signup
);

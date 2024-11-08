import { createRouteGroup } from "../../lib/create-route-group.js";
import { loginRouteGroup } from "./login.index.js";
import { signupRouteGroup } from "./signup.index.js";

export const authRouteGroup = createRouteGroup()
  .route("/signup", signupRouteGroup)
  .route("/login", loginRouteGroup);

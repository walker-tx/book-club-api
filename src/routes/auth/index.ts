import { createRouteGroup } from "../../lib/create-route-group.js";
// import { login as loginRoute } from "./login.routes.js";
import { login as loginHandler } from "./login.handlers.js";
import { signup as signupRoute } from "./signup.routes.js";
import { signup as signupHandler } from "./signup.handlers.js";
import { loginRouteGroup } from "./login.index.js";
import { signupRouteGroup } from "./signup.index.js";

const authRouteGroup = createRouteGroup()
  .route("/login", loginRouteGroup)
  .route("/signup", signupRouteGroup);

export default authRouteGroup;

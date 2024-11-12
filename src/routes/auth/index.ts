import { createRouteGroup } from "../../lib/create-route-group.js";
import { loginRouteGroup } from "./login.index.js";
import { signupRouteGroup } from "./signup.index.js";

const authRouteGroup = createRouteGroup()
  .route("/login", loginRouteGroup)
  .route("/signup", signupRouteGroup);

export default authRouteGroup;

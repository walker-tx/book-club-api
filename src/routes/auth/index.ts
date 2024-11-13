import { createRouteGroup } from "../../lib/create-route-group.js";
import { validateApiKey } from "../../lib/middleware/validate-api-key.js";
import { loginRouteGroup } from "./login.index.js";
import { signupRouteGroup } from "./signup.index.js";

const authRouteGroup = createRouteGroup();

authRouteGroup.use(validateApiKey);

authRouteGroup
  .route("/login", loginRouteGroup)
  .route("/signup", signupRouteGroup);

export default authRouteGroup;

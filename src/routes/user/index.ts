import { createRouteGroup } from "../../lib/create-route-group.js";
import { userLibraryRouteGroup } from "./library/index.js";
import * as handlers from "./user.handlers.js";
import * as routes from "./user.routes.js";

const userRouteGroup = createRouteGroup()
  .openapi(routes.getOne, handlers.getOne)
  .route("/{userId}/library", userLibraryRouteGroup);

export default userRouteGroup;

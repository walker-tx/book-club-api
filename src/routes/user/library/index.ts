import { createRouteGroup } from "../../../lib/create-route-group.js";
import * as routes from "./library.routes.js";
import * as handlers from "./library.handlers.js";

export const userLibraryRouteGroup = createRouteGroup()
  .openapi(routes.get, handlers.list)
  .openapi(routes.add, handlers.add);

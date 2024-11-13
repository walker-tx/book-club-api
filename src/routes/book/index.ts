import { createRouteGroup } from "../../lib/create-route-group.js";
import { validateApiKey } from "../../lib/middleware/validate-api-key.js";
import * as handlers from "./book.handlers.js";
import * as routes from "./book.routes.js";

const bookRouteGroup = createRouteGroup();

bookRouteGroup.use(validateApiKey);
// bookRouteGroup.use(validateBearerAuth);

bookRouteGroup
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.create, handlers.create)
  .openapi(routes._delete, handlers._delete);

export default bookRouteGroup;

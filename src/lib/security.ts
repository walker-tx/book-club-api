import { validateBearerAuth } from "./middleware/validate-bearer-auth.js";

export const securityMixins = {
  security: [
    {
      BearerAuth: [],
      ApiKeyAuth: [],
      AppIdAuth: [],
    },
  ],
  middleware: [
    // assuming that the Api Key + App ID Stuff is validated prior
    validateBearerAuth,
  ],
};

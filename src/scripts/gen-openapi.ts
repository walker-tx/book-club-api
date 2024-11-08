import fs from "fs";
import app from "../routes/app.routes.js";
import { openApiConfig } from "../lib/openapi.js";

const document = app.getOpenAPIDocument(openApiConfig);

fs.writeFileSync("openapi.json", JSON.stringify(document, null, 2));

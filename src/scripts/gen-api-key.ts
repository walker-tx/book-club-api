/**
 * Generate and save an API key
 */

import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { exit } from "process";
import * as schema from "../db/schema.js";

console.log("Creating a key...");

dotenv.config({ path: ".env.local" });

const db = drizzle(process.env.POSTGRES_URL!, { schema });

// Inputs
const userId: number = 1;

// Generate a new API key
const keyString = randomBytes(32).toString("hex");

// Hash the key
const keyHash = bcrypt.hashSync(keyString, 10);

// Save the key hash to the db
db.insert(schema.apiKeys)
  .values({ key: keyHash, userId })
  .returning()
  .then((res) => {
    console.log("Created key for user", userId);
    console.log("APP ID :", res[0].appId);
    console.log("API KEY:", keyString);
  })
  .finally(() => exit(0));

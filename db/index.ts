import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = postgres(process.env.SUPABASE_DATABASE_URL || "");
const db = drizzle(client, { schema });

export default db;

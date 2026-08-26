import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)

// Pass the entire schema namespace containing both tables AND relations
export const db = drizzle(client, { schema })
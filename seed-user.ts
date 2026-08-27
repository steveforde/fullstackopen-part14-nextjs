import { config } from "dotenv"
config({ path: ".env.local" })
import bcrypt from "bcryptjs"
import { db } from "./db"
import { users } from "./db/schema"

async function run() {
  const passwordHash = await bcrypt.hash("password123", 10)
  
  await db.insert(users).values({
    username: "Mary",
    name: "Mary Forde",   
    passwordHash,
  })

  console.log("Success! Created user: Mary with password: password123")
  process.exit(0)
}

run().catch((err) => {
  console.error("Error creating user (username might already exist):", err)
  process.exit(1)
})
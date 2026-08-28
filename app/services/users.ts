import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"

export const getUsers = async () => {
  return await db.select().from(users)
}

export const getUserByUsername = async (username: string) => {
  const result = await db.select().from(users).where(eq(users.username, username))
  return result[0]
}

export const createUser = async (username: string, passwordHash: string) => {
  await db.insert(users).values({ 
    username, 
    passwordHash,
    name: username 
  })
}
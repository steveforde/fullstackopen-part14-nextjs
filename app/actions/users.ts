"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { getUserByUsername, createUser } from "../services/users"

export const registerUser = async (
  prevState: { error: string; values?: { username: string } },
  formData: FormData
) => {
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  if (!username || username.length < 4) {
    return { error: "Username must be at least 4 characters long", values: { username } }
  }
  if (!password || password.length < 4) {
    return { error: "Password must be at least 4 characters long", values: { username } }
  }
  if (password !== passwordConfirm) {
    return { error: "Passwords do not match", values: { username } }
  }

  const existingUser = await getUserByUsername(username)
  if (existingUser) {
    return { error: "Username is already taken", values: { username } }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await createUser(username, passwordHash)

  redirect("/login")
}
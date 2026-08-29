"use server"

import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: { error: string; success?: boolean; values?: { title: string; author: string; url: string } },
  formData: FormData
) => {
  const session = await auth()
  
  if (!session?.user || !session.user.id) {
    throw new Error("Unauthorized: You must be logged in to create a blog.")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long", success: false, values: { title, author, url } }
  }
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters long", success: false, values: { title, author, url } }
  }
  if (!url || url.length < 5) {
    return { error: "URL must be at least 5 characters long", success: false, values: { title, author, url } }
  }

  const userId = Number(session.user.id)

  await addBlog(title, author, url, userId)

  revalidatePath("/blogs")
  return { error: "", success: true }
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
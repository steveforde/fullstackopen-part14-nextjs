"use server"

import { db } from '@/db'
import { blogs, readingList } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

export async function likeBlogAction(formData: FormData) {
  const id = Number(formData.get("id"))

  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id))
  if (!blog) return

  await db.update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))

  revalidatePath(`/blogs/${id}`)
  revalidatePath('/blogs')
}

export async function addToReadingListAction(formData: FormData) {
  const blogId = Number(formData.get("blogId"))
  const session = await auth()

  if (!session?.user) return

  const user = session.user

  // Check if already in reading list
  const existing = await db.select().from(readingList).where(
    and(eq(readingList.userId, Number(user.id)), eq(readingList.blogId, blogId))
  )

  if (existing.length === 0) {
    await db.insert(readingList).values({
      userId: Number(user.id),
      blogId,
      read: false,
    })
  }

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath('/me')
}

export async function createBlog(
  prevState: { error: string; success: boolean; values: { title: string; author: string; url: string } },
  formData: FormData
) {
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const values = { title, author, url }

  const session = await auth()
  if (!session?.user) {
    return { error: "You must be logged in", success: false, values }
  }

  if (!title || !author || !url) {
    return { error: "All fields are required", success: false, values }
  }

  const [newBlog] = await db.insert(blogs).values({
    title,
    author,
    url,
    likes: 0,
    userId: Number(session.user.id),
  }).returning()

  // Automatically add to the creator's own reading list
  await db.insert(readingList).values({
    userId: Number(session.user.id),
    blogId: newBlog.id,
    read: false,
  })

  revalidatePath('/blogs')
  revalidatePath('/me')

  return { error: "", success: true, values: { title: "", author: "", url: "" } }
}

export async function getReadingList(userId: number) {
  return db
    .select({
      id: readingList.id,
      read: readingList.read,
      blogId: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
    })
    .from(readingList)
    .innerJoin(blogs, eq(readingList.blogId, blogs.id))
    .where(eq(readingList.userId, userId))
}

export async function markAsReadAction(formData: FormData) {
  const id = Number(formData.get("id"))
  const session = await auth()

  if (!session?.user) return

  await db.update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, Number(session.user.id))))

  revalidatePath('/me')
}
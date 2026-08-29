import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users, blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'token missing' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')

  const userList = await db.select().from(users).where(eq(users.token, token)).limit(1)
  const user = userList[0]

  if (!user) {
    return NextResponse.json({ error: 'invalid token' }, { status: 401 })
  }

  const userBlogs = await db
    .select({
      author: blogs.author,
      title: blogs.title,
      url: blogs.url,
    })
    .from(blogs)
    .where(eq(blogs.userId, user.id))

  return NextResponse.json({
    ...user,
    createdBlogs: userBlogs,
  })
}
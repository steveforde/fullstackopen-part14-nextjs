import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function UserPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  })

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>
      <h2>Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
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
    <div className="page">
      <div className="card">
        <h1 className="heading">{user.name}</h1>
        <p className="mb-6" style={{ color: "var(--muted)" }}>Username: {user.username}</p>

        <h2 className="text-lg font-semibold mb-3">Blogs</h2>
        <ul className="flex flex-col gap-2">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`} className="nav-link" style={{ color: "var(--accent)" }}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
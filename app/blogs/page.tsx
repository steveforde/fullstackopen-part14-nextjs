import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const searchTerm = filter ? filter.toLowerCase() : ""

  const allBlogs = await getBlogs()

  // Exercise 5: Sort descending by likes
  const sortedBlogs = [...allBlogs].sort((a, b) => b.likes - a.likes)

  // Exercise 6: Filter by title if search param exists
  const blogs = searchTerm
    ? sortedBlogs.filter((blog) => blog.title.toLowerCase().includes(searchTerm))
    : sortedBlogs

  return (
    <div className="page">
      <h2 className="heading">Blogs</h2>

      <form method="GET" className="flex gap-2 items-center mb-6">
        <input
          type="text"
          name="filter"
          defaultValue={filter || ""}
          placeholder="Search by title..."
          className="flex-1 rounded-md px-3 py-2 outline-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        />
        <button type="submit" className="btn-primary">
          search
        </button>
        {filter && (
          <Link
            href="/blogs"
            className="rounded-md px-4 py-2 font-medium"
            style={{ background: "var(--border)", color: "var(--foreground)" }}
          >
            clear
          </Link>
        )}
      </form>

      <ul className="flex flex-col gap-3">
        {blogs.map((blog) => (
          <li key={blog.id} className="card">
            <h3 className="mb-2">
              <Link href={`/blogs/${blog.id}`} className="font-semibold text-lg hover:underline">
                {blog.title}
              </Link>
            </h3>
            <p className="mb-1" style={{ color: "var(--muted)" }}>Author: {blog.author}</p>
            <p style={{ color: "var(--muted)" }}>
              Likes: {blog.likes} |{" "}
              <a href={blog.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                Read more
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
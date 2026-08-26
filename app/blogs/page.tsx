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
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Blogs</h2>

      {/* Search Form and Clear Link */}
      <form method="GET" style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input 
          type="text" 
          name="filter" 
          defaultValue={filter || ""} 
          placeholder="Search by title..." 
          style={{ flex: 1, padding: "0.5rem" }} 
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          search
        </button>
        {filter && (
          <Link href="/blogs" style={{ padding: "0.5rem 1rem", background: "#ccc", color: "#333", textDecoration: "none", borderRadius: "4px" }}>
            clear
          </Link>
        )}
      </form>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {blogs.map((blog) => (
          <li 
            key={blog.id} 
            style={{ 
              padding: "1rem", 
              marginBottom: "1rem", 
              border: "1px solid #ddd", 
              borderRadius: "6px",
              background: "#fafafa" 
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h3>
            <p style={{ margin: "0 0 0.5rem 0", color: "#555" }}>Author: {blog.author}</p>
            <p style={{ margin: 0, color: "#777" }}>
              Likes: {blog.likes} | <a href={blog.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
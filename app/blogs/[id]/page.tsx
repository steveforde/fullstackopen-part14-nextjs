import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlogAction } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>{blog.title}</h2>
      <p style={{ color: "#555" }}>Author: {blog.author}</p>
      <p style={{ color: "#777" }}>
        URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      </p>
      <p style={{ color: "#777" }}>Likes: {blog.likes}</p>
      
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" style={{ padding: "0.5rem 1rem", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          like
        </button>
      </form>
    </div>
  )
}

export default BlogPage
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"

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
    </div>
  )
}

export default BlogPage
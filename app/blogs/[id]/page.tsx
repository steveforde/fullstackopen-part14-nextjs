import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlogAction } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">{blog.title}</h2>
        <p className="mb-2" style={{ color: "var(--muted)" }}>Author: {blog.author}</p>
        <p className="mb-4" style={{ color: "var(--muted)" }}>
          URL:{" "}
          <a href={blog.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            {blog.url}
          </a>
        </p>
        <p className="mb-6" style={{ color: "var(--muted)" }}>Likes: {blog.likes}</p>

        <form action={likeBlogAction}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit" className="btn-primary">like</button>
        </form>
      </div>
    </div>
  )
}

export default BlogPage
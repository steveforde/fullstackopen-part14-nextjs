import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlogAction, addToReadingListAction } from "../../actions/blogs"
import { auth } from "@/auth"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const session = await auth()
  const user = session?.user

  const showAddToReadingList = user && Number(user.id) !== blog.userId

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

        <div className="flex gap-4 items-center">
          <form action={likeBlogAction}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" className="btn-primary">like</button>
          </form>

          {showAddToReadingList && (
            <form action={addToReadingListAction}>
              <input type="hidden" name="blogId" value={blog.id} />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium">
                add to reading list
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
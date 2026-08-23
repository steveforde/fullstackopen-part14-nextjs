import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Blogs</h2>
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
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{blog.title}</h3>
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
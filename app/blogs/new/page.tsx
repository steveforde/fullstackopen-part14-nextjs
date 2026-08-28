"use client"

import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "", values: { title: "", author: "", url: "" } })

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>New Blog</h2>
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Title</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={state.values?.title} 
            required 
            style={{ width: "100%", padding: "0.5rem" }} 
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Author</label>
          <input 
            type="text" 
            name="author" 
            defaultValue={state.values?.author} 
            required 
            style={{ width: "100%", padding: "0.5rem" }} 
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>URL</label>
          <input 
            type="text" 
            name="url" 
            defaultValue={state.values?.url} 
            required 
            style={{ width: "100%", padding: "0.5rem" }} 
          />
        </div>
        <button type="submit" style={{ padding: "0.7rem", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Create
        </button>
        {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlog
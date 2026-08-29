"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
    values: { title: "", author: "", url: "" }
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">Create a new blog</h2>
        <form action={formAction}>
          <div className="field">
            <label>Title</label>
            <input type="text" name="title" defaultValue={state.values?.title} required />
          </div>
          <div className="field">
            <label>Author</label>
            <input type="text" name="author" defaultValue={state.values?.author} required />
          </div>
          <div className="field">
            <label>URL</label>
            <input type="text" name="url" defaultValue={state.values?.url} required />
          </div>
          <button type="submit" className="btn-primary">Create</button>
          {state?.error && <p className="error-text">{state.error}</p>}
        </form>
      </div>
    </div>
  )
}

export default NewBlog
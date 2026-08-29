"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input type="text" name="username" required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="btn-primary">Login</button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  )
}
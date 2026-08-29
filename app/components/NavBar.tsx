"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="navbar">
      <div className="flex gap-2 items-center">
        <Link href="/" className="nav-link">home</Link>
        <Link href="/blogs" className="nav-link">blogs</Link>
        <Link href="/users" className="nav-link">users</Link>
        <Link href="/blogs/new" className="nav-link">create new</Link>
      </div>
      <div className="flex gap-3 items-center">
        {session?.user ? (
          <>
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {session.user.name} logged in
            </span>
            <button onClick={() => signOut()} className="btn-danger">
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="nav-link" style={{ color: "var(--accent)" }}>register</Link>
            <Link href="/login" className="nav-link" style={{ color: "var(--accent)" }}>login</Link>
          </>
        )}
      </div>
    </nav>
  )
}
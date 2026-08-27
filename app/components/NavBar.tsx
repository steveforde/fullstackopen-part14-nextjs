"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav style={{ 
      display: "flex", 
      gap: "1.5rem", 
      padding: "1rem 2rem", 
      background: "#f4f4f5", 
      borderBottom: "1px solid #e4e4e7",
      color: "#18181b",
      alignItems: "center"
    }}>
      <Link href="/" style={{ color: "#18181b", textDecoration: "none", fontWeight: 500 }}>home</Link>
      <Link href="/blogs" style={{ color: "#18181b", textDecoration: "none", fontWeight: 500 }}>blogs</Link>
      <Link href="/users" style={{ color: "#18181b", textDecoration: "none", fontWeight: 500 }}>users</Link>
      <Link href="/blogs/new" style={{ color: "#18181b", textDecoration: "none", fontWeight: 500 }}>create new</Link>

      <div style={{ marginLeft: "auto", display: "flex", gap: "1rem", alignItems: "center" }}>
        {session?.user ? (
          <>
            <span style={{ fontSize: "0.9rem" }}>{session.user.name} logged in</span>
            <button 
              onClick={() => signOut()}
              style={{ padding: "0.4rem 0.8rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              logout
            </button>
          </>
        ) : (
          <Link href="/login" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>login</Link>
        )}
      </div>
    </nav>
  )
}
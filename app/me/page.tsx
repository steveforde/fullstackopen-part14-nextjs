import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getUserByUsername } from "../services/users"
import { generateTokenAction } from "../actions/users"

export default async function MePage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await getUserByUsername(session.user.email)

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">My Profile</h2>
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="mb-6">
          <span className="font-semibold">Username:</span> {user.username}
        </p>

        <hr className="mb-6" style={{ borderColor: "var(--border)" }} />

        <h3 className="text-lg font-semibold mb-3">API Token</h3>

        {user.token ? (
          <div className="mb-4">
            <p className="mb-1 text-sm" style={{ color: "var(--muted)" }}>Current token:</p>
            <p
              className="rounded-md px-3 py-2 font-mono text-sm break-all"
              style={{ background: "var(--background)", border: "1px solid var(--border)" }}
            >
              {user.token}
            </p>
          </div>
        ) : (
          <p className="mb-4" style={{ color: "var(--muted)" }}>
            No token has been generated yet.
          </p>
        )}

        <form action={generateTokenAction}>
          <button type="submit" className="btn-primary">Generate New Token</button>
        </form>
      </div>
    </div>
  )
}
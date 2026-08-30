import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getUserByUsername } from "../services/users"
import { generateTokenAction } from "../actions/users"
import { getReadingList, markAsReadAction } from "../actions/blogs"

export default async function MePage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await getUserByUsername(session.user.email)

  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingList(user.id)
  const unread = readingList.filter((item) => !item.read)
  const read = readingList.filter((item) => item.read)

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

        <hr className="mb-6 mt-6" style={{ borderColor: "var(--border)" }} />

        <h3 className="text-lg font-semibold mb-3">Reading List</h3>

        <h4 className="font-semibold mb-2">Unread ({unread.length})</h4>
        {unread.length === 0 ? (
          <p className="mb-4" style={{ color: "var(--muted)" }}>Nothing unread.</p>
        ) : (
          <ul className="mb-4">
            {unread.map((item) => (
              <li key={item.id} className="flex items-center justify-between mb-2">
                <a href={`/blogs/${item.blogId}`} style={{ color: "var(--accent)" }}>
                  {item.title}
                </a>
                <form action={markAsReadAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm">
                    mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <h4 className="font-semibold mb-2">Read ({read.length})</h4>
        {read.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Nothing read yet.</p>
        ) : (
          <ul>
            {read.map((item) => (
              <li key={item.id} className="mb-2">
                <a href={`/blogs/${item.blogId}`} style={{ color: "var(--accent)" }}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
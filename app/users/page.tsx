import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">Users</h2>
        <ul className="flex flex-col gap-2">
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.username}`} className="nav-link" style={{ color: "var(--accent)" }}>
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Users
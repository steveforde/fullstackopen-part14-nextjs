import { registerUser } from "../actions/users"

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Register</h2>
      <form action={registerUser} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Username</label>
          <input type="text" name="username" required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Name</label>
          <input type="text" name="name" required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Password</label>
          <input type="password" name="password" required style={{ width: "100%", padding: "0.5rem" }} />
        </div>
        <button type="submit" style={{ padding: "0.7rem", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Register
        </button>
      </form>
    </div>
  )
}
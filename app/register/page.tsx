"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "", values: { username: "" } })

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Register</h2>
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Username</label>
          <input 
            type="text" 
            name="username" 
            defaultValue={state.values?.username} 
            required 
            style={{ width: "100%", padding: "0.5rem" }} 
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Password</label>
          <input 
            type="password" 
            name="password" 
            required 
            style={{ width: "100%", padding: "0.5rem" }} 
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Confirm Password</label>
          <input 
            type="password" 
            name="passwordConfirm" 
            required 
            style={{ width: "100%", padding: "0.5rem" }} 
          />
        </div>
        <button type="submit" style={{ padding: "0.7rem", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Register
        </button>
        {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}
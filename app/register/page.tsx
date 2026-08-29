"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "", values: { username: "" } })

  return (
    <div className="page">
      <div className="card">
        <h2 className="heading">Register</h2>
        <form action={formAction}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              defaultValue={state.values?.username}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input type="password" name="passwordConfirm" required />
          </div>
          <button type="submit" className="btn-primary">Register</button>
          {state?.error && <p className="error-text">{state.error}</p>}
        </form>
      </div>
    </div>
  )
}
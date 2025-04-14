import { useState } from 'react'
import '../styles/Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      window.location.href = '/dashboard'
    } else {
      alert(data.msg || data.error)
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Log In</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  )
}

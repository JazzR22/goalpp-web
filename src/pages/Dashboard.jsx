import { useEffect } from 'react'

export default function Dashboard() {
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      window.location.href = '/'
    }
  }, [token])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome to the app!</p>
    </div>
  )
}

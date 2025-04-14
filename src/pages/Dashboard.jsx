import { useEffect, useState } from 'react'
import MonthNavigator from '../components/MonthNavigator'

export default function Dashboard() {
  const [goals, setGoals] = useState([])
  const [monthGoals, setMonthGoals] = useState([])
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      window.location.href = '/'
    }
  }, [token])

  useEffect(() => {
    if (!token) return

    fetch('http://localhost:5000/api/goals/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(err => console.error('Failed to fetch goals:', err))
  }, [token])

  useEffect(() => {
    setMonthGoals(
      goals.flatMap(goal =>
        goal.months
          .filter(m => m.month === month && m.year === year)
          .map(monthData => ({ ...goal, monthData }))
      )
    )
  }, [goals, month, year])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <MonthNavigator month={month} year={year} setMonth={setMonth} setYear={setYear} />
      {monthGoals.length === 0 ? (
        <p>No goals for this month</p>
      ) : (
        monthGoals.map(goal => (
          <div key={goal._id} style={{ marginBottom: '2rem' }}>
            <h3>{goal.title}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {goal.monthData.days.map(day => (
                <label key={day.day}>
                  <input
                    type="checkbox"
                    checked={day.completed}
                    readOnly
                  />
                  {day.day}
                </label>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

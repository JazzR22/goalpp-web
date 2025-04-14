import { useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import MonthNavigator from '../components/MonthNavigator'
import AddGoalButton from '../components/AddGoalButton'

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

  const handleCreateGoal = async ({ title, startDate, endDate }) => {
    try {
      const res = await fetch('http://localhost:5000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, startDate, endDate })
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        alert(data.error || 'Failed to create goal')
        return
      }
  
      setGoals(prev => [...prev, data])
    } catch (err) {
      console.error('Failed to create goal:', err)
    }
  }  

  const handleDayToggle = async (goalId, { year, month, day, completed }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/goals/${goalId}/day`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ day: new Date(year, month, day), completed })
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        alert(data.error || 'Failed to update day')
        return
      }
  
      // update local state
      setGoals(prev =>
        prev.map(g => (g._id === goalId ? data.goal : g))
      )
    } catch (err) {
      console.error('Error updating day:', err)
    }
  }  

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
  
      <div className="dashboard-header">
        <MonthNavigator month={month} year={year} setMonth={setMonth} setYear={setYear} />
        <AddGoalButton onAdd={handleCreateGoal} />
      </div>
  
      {monthGoals.length === 0 ? (
        <p>No goals for this month</p>
      ) : (
        monthGoals.map(goal => (
          <div key={goal._id} className="goal-block">
            <h3>{goal.title}</h3>
            <div className="goal-days">
              {goal.monthData.days.map(day => (
                <label key={day.day}>
                  <input
                    type="checkbox"
                    checked={day.completed}
                    onChange={e =>
                      handleDayToggle(goal._id, {
                        year: goal.monthData.year,
                        month: goal.monthData.month,
                        day: day.day,
                        completed: e.target.checked
                      })
                    }
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

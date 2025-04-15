import { useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import MonthNavigator from '../components/MonthNavigator'
import AddGoalButton from '../components/AddGoalButton'
import { useToast } from '../context/ToastContext'
import DeleteButton from '../components/DeleteButton'
import { useConfirm } from '../context/ConfirmContext'


export default function Dashboard() {
  const [goals, setGoals] = useState([])
  const [monthGoals, setMonthGoals] = useState([])
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const token = localStorage.getItem('token')
  const { pushToast } = useToast()
  const { confirm } = useConfirm()

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
        pushToast('Failed to create goal')
        return
      }
  
      setGoals(prev => [...prev, data])
      pushToast(`Goal "${title}" created!`, 'success')
    } catch (err) {
      pushToast('Network error when create goal', 'error')
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
        pushToast('Failed to update day')
        return
      }
  
      // update local state
      setGoals(prev =>
        prev.map(g => (g._id === goalId ? data.goal : g))
      )
      pushToast('Day updated ', 'success')
    } catch (err) {
      pushToast('Network error when updating day', 'error')
    }
  }  

  const handleDeleteGoal = async (goalId, title) => {
    const confirmed = await confirm(`Are you sure you want to delete "${title}"?`)
    if (!confirmed) return
  
    try {
      const res = await fetch(`http://localhost:5000/api/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        pushToast(data.message || 'Failed to delete goal', 'error')
        return
      }
  
      setGoals(prev => prev.filter(g => g._id !== goalId))
      pushToast(`Goal "${title}" deleted`, 'success')
    } catch (err) {
      console.error('Delete error:', err)
      pushToast('Network error while deleting', 'error')
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
              
            <DeleteButton onClick={() => handleDeleteGoal(goal._id, goal.title)} />
            </div>
          </div>
        ))
      )}
    </div>
  )
  
}

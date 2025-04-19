import { useEffect, useState } from 'react'
import '../styles/MonthView.css'
import MonthNavigator from '../components/MonthNavigator'
import AddGoalButton from '../components/AddGoalButton'
import { useToast } from '../context/ToastContext'
import DeleteButton from '../components/DeleteButton'
import { useConfirm } from '../context/ConfirmContext'

export default function MonthView() {
  const [goals, setGoals] = useState([])
  const [monthGoals, setMonthGoals] = useState([])
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const token = localStorage.getItem('token')
  const { pushToast } = useToast()
  const { confirm } = useConfirm()

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
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
    <div className="dashboard-header">
      <MonthNavigator month={month} year={year} setMonth={setMonth} setYear={setYear} />
      <AddGoalButton onAdd={handleCreateGoal} />
    </div>

    {monthGoals.length === 0 ? (
      <p>No goals for this month</p>
    ) : (
      <div className="month-table-wrapper">
        <table className="month-table">
          <thead>
            <tr>
              <th>Goal</th>
              {Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => (
                <th key={i + 1}>{i + 1}</th>
              ))}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {monthGoals.map(goal => {
              const daysMap = new Map(goal.monthData.days.map(d => [d.day, d.completed]));

              return (
                <tr key={goal._id}>
                  <td>{goal.title}</td>
                  {Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => {
                    const day = i + 1
                    const completed = daysMap.get(day)
                    return (
                      <td
                        key={day}
                        className={
                          completed === undefined
                            ? 'status-undefined'
                            : completed
                            ? 'status-done'
                            : 'status-todo'
                        }
                      >
                        {completed !== undefined ? (
                          <label className="container">
                          <input
                            type="checkbox"
                            checked={completed}
                            onChange={e =>
                              handleDayToggle(goal._id, {
                                year: goal.monthData.year,
                                month: goal.monthData.month,
                                day,
                                completed: e.target.checked
                              })
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                        ) : null}
                      </td>
                    )
                  })}
                  <td>
                    <DeleteButton onClick={() => handleDeleteGoal(goal._id, goal.title)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
)

  
}

import { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../styles/CreateGoalPopup.css'

export default function CreateGoalPopup({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const handleSubmit = (e) => {
    e.preventDefault()

    const { startDate, endDate } = range[0]
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())

    if (monthsDiff >= 12) {
      alert('Goals must be under 1 year')
      return
    }

    onCreate({ title, startDate, endDate })
    onClose()
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>➕ New Goal</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Goal title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <DateRange
            editableDateInputs
            onChange={item => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            minDate={new Date()}
          />

          <div className="popup-buttons">
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

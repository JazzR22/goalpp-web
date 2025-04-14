import { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function CrearGoalPopup({ onClose, onCreate }) {
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
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>➕ New Goal</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  popup: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '720px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
  }
}

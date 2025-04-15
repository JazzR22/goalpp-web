import '../styles/MonthNavigator.css'
import Icon from './Icon'
import GhostButton from './GhostButton'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function MonthNavigator({ month, year, setMonth, setYear }) {
  const prev = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const next = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className="month-nav">
      <GhostButton onClick={prev} size={48} >
        <Icon name="arrowL" size={32} />
      </GhostButton>
      
      <h2 className="month-title">{monthNames[month]} {year}</h2>

      <GhostButton onClick={next} size={48} >
        <Icon name="arrowR" size={32} />
      </GhostButton>
    </div>
  )
}

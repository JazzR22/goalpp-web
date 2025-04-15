import '../styles/MonthNavigator.css'
import Icon from './Icon'

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
      <button onClick={prev}>
      <Icon name="arrowL" size={32} />
      </button>
      <h2 className="month-title">{monthNames[month]} {year}</h2>
      <button onClick={next}>
      <Icon name="arrowR" size={32} />
      </button>
    </div>
  )
}

import { useEffect, useState } from 'react'
import '../styles/ToastItem.css'

export default function ToastItem({ message, onClose, type = 'error', duration = 3000 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timerIn = setTimeout(() => setVisible(true), 50)
    const timerOut = setTimeout(() => setVisible(false), duration - 300)
    const timerRemove = setTimeout(onClose, duration)

    return () => {
      clearTimeout(timerIn)
      clearTimeout(timerOut)
      clearTimeout(timerRemove)
    }
  }, [onClose, duration])

  const config = {
    success: { bg: '#dbf0e0' },
    error:   { bg: '#f0dcdb' },
    warning: { bg: '#f0eedb' },
  }

  const { icon, bg } = config[type] || config.error

  return (
    <div
      className="toast"
      style={{
        backgroundColor: bg,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(100%)'
      }}
    >
      {icon} {message}
    </div>
  )
}

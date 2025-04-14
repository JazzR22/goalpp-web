import ToastItem from './ToastItem'
import '../styles/ToastList.css'

export default function ToastList({ messages, remove }) {
  return (
    <div className="toast-container">
      {messages.map(msg => (
        <ToastItem
          key={msg.id}
          message={msg.text}
          type={msg.type || 'error'}
          onClose={() => remove(msg.id)}
        />
      ))}
    </div>
  )
}

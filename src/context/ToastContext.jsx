import { createContext, useContext, useState } from 'react'
import ToastList from '../components/ToastList'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const toastQueue = []

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const dispatchNextToast = () => {
    if (toastQueue.length === 0) return

    const toast = toastQueue[0]
    setToasts(prev => [...prev, toast])

    setTimeout(() => {
      toastQueue.shift()
      dispatchNextToast()
    }, 300) // delay between toasts
  }

  const pushToast = (text, type = 'error') => {
    const id = Date.now() + Math.random()
    const toast = { id, text, type }

    toastQueue.push(toast)
    if (toastQueue.length === 1) {
      dispatchNextToast()
    }
  }

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <ToastList messages={toasts} remove={removeToast} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

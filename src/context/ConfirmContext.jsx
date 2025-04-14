import { createContext, useContext, useState } from 'react'
import '../styles/ConfirmModal.css'


const ConfirmContext = createContext()

export function ConfirmProvider({ children }) {
  const [modal, setModal] = useState({ visible: false, message: '', resolve: null })
  const [animating, setAnimating] = useState(false)

  const confirm = (message) => {
    return new Promise((resolve) => {
        setAnimating(true)
        setModal({ visible: true, message, resolve })
    })
  }

  const handleResponse = (result) => {
    setAnimating(false)

    setTimeout(() => {
        modal.resolve(result)
        setModal({ ...modal, visible: false })
    }, 300)
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {modal.visible && (
  <div className="confirm-overlay" style={{ opacity: animating ? 1 : 0 }}>
    <div className={`confirm-modal ${!animating ? 'hidden' : ''}`}>
      <p>{modal.message}</p>
      <div className="confirm-buttons">
        <button className="confirm-button" onClick={() => handleResponse(true)}>Yes</button>
        <button className="cancel-button" onClick={() => handleResponse(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}

    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => useContext(ConfirmContext)


import { useState } from 'react'
import CreateGoalPopup from './CreateGoalPopup'
import Icon from './Icon'

export default function AddGoalButton({ onAdd }) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        style={{
          padding: '0.6rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        <Icon name="plus" size={32} />
      </button>

      {showPopup && (
        <CreateGoalPopup
          onClose={() => setShowPopup(false)}
          onCreate={onAdd}
        />
      )}
    </>
  )
}

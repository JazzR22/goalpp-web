import { useState } from 'react'
import CreateGoalPopup from './CreateGoalPopup'
import Icon from './Icon'
import GhostButton from './GhostButton'

export default function AddGoalButton({ onAdd }) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <GhostButton
      onClick={() => setShowPopup(true)}
      size={48}
      >
        <Icon name="plus" size={28} />
      </GhostButton>

      {showPopup && (
        <CreateGoalPopup
          onClose={() => setShowPopup(false)}
          onCreate={onAdd}
        />
      )}
    </>
  )
}

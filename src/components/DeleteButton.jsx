
import Icon from './Icon'
import GhostButton from './GhostButton'

export default function DeleteButton({ onClick }) {
  return (
    <GhostButton
      size={48}
      >
        <Icon name="delete" size={28} />
      </GhostButton>
  )
}

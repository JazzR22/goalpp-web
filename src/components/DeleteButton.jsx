import '../styles/DeleteButton.css'
import Icon from './Icon'

export default function DeleteButton({ onClick }) {
  return (
    <button className="delete-button" onClick={onClick}>
      <Icon name="delete" size={32} />
    </button>
  )
}

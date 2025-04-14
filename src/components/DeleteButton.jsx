import '../styles/DeleteButton.css'

export default function DeleteButton({ onClick }) {
  return (
    <button className="delete-button" onClick={onClick}>
      🗑
    </button>
  )
}

// GhostButton.jsx
import '../styles/GhostButton.css';

export default function GhostButton({ children, size = 48, className = "", ...props }) {
  return (
    <button
      style={{ width: size, height: size }}
      className={`ghost-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

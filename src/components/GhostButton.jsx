export default function GhostButton({ children, size = 48, className = "", ...props }) {
  return (
    <button
      style={{ width: size, height: size }}
      className={`
        flex items-center justify-center
        border border-transparent
        bg-transparent
        transition-all duration-200 ease-in-out
        hover:border-gray-400 hover:shadow-md
        rounded
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

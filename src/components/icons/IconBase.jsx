export default function IconBase({ children, className = "", size = 24, ...props }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="gray"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-200 hover:scale-110 cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </svg>
    );
  }
  
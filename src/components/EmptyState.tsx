type EmptyStateProps = {
  title?: string
  message?: string
  icon?: React.ReactNode
}

export default function EmptyState({
  title = "No targets found",
  message = "Try adjusting your search or filters",
  icon,
}: EmptyStateProps) {
  return (
    <div className="w-full max-w-md mx-auto py-16 px-4 text-center animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-6 flex justify-center">
        {icon || (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-20 h-20 text-gray-300"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path
              d="M12 6v6m0 4h.01"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  )
}

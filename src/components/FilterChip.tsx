type FilterChipProps = {
  label: string
  active: boolean
  count?: number
  onClick: () => void
  color?: "red" | "orange" | "green" | "gray"
}

export default function FilterChip({
  label,
  active,
  count,
  onClick,
  color = "gray",
}: FilterChipProps) {
  const colorClasses = {
    red: active
      ? "bg-red-500 text-white border-red-500"
      : "bg-white text-red-500 border-red-200 hover:border-red-400",
    orange: active
      ? "bg-orange-500 text-white border-orange-500"
      : "bg-white text-orange-500 border-orange-200 hover:border-orange-400",
    green: active
      ? "bg-green-500 text-white border-green-500"
      : "bg-white text-green-500 border-green-200 hover:border-green-400",
    gray: active
      ? "bg-gray-700 text-white border-gray-700"
      : "bg-white text-gray-700 border-gray-200 hover:border-gray-400",
  }

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium border-2 
        transition-all duration-200 ease-out
        hover:scale-105 active:scale-95
        whitespace-nowrap
        ${colorClasses[color]}
      `}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-1.5 ${active ? "opacity-90" : "opacity-60"}`}>
          ({count})
        </span>
      )}
    </button>
  )
}

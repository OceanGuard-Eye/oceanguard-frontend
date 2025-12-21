import { getSeverityColor, SeverityLevel } from "../utils/formatters"

type SeverityBadgeProps = {
  severity: SeverityLevel
  className?: string
}

export default function SeverityBadge({ severity, className = "" }: SeverityBadgeProps) {
  const labels = {
    critical: "Critical",
    warning: "Warning",
    normal: "Normal",
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
        ${getSeverityColor(severity)} text-white
        ${className}
      `}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      {labels[severity]}
    </span>
  )
}

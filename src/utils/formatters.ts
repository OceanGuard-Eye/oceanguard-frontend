export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  
  const years = Math.floor(days / 365)
  return `${years}y ago`
}

export type SeverityLevel = "critical" | "warning" | "normal"

export function getSeverityColor(severity: SeverityLevel): string {
  switch (severity) {
    case "critical":
      return "bg-red-500"
    case "warning":
      return "bg-orange-500"
    case "normal":
      return "bg-green-500"
  }
}

export function getSeverityTextColor(severity: SeverityLevel): string {
  switch (severity) {
    case "critical":
      return "text-red-600"
    case "warning":
      return "text-orange-600"
    case "normal":
      return "text-green-600"
  }
}

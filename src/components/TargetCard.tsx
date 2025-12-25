import { formatTimeAgo } from "../utils/formatters"
import SeverityBadge from "./SeverityBadge"

type TargetCardProps = {
  location: string
  icon: "temperature" | "fish" | "trash"
  hasAlert?: boolean
  severity?: "critical" | "warning" | "normal"
  timestamp?: Date
  onClick?: () => void
  lat?: number
  lng?: number
}

export default function TargetCard({
  location,
  icon,
  hasAlert = false,
  severity = "normal",
  timestamp,
  onClick,
  lat,
  lng,
}: TargetCardProps) {
  // Generate satellite map thumbnail URL using ESRI
  const mapThumbnail = lat && lng
    ? `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}&size=120,120&format=jpg&f=image`
    : null

  const renderIcon = () => {
    switch (icon) {
      case "temperature":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-10 h-10 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
              <rect x="10" y="6" width="4" height="10" rx="2" fill="currentColor" />
              <circle cx="12" cy="18" r="3" fill="currentColor" />
              <path
                d="M12 14 L12 16"
                stroke="white"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="absolute top-0 -right-1 w-4 h-4 text-red-500"
            >
              <path
                fill="currentColor"
                d="M12 2L15 8L12 14L9 8L12 2Z"
              />
            </svg>
          </div>
        )
      case "fish":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-11 h-11 rounded-full border-2 border-sky-400 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-sky-400"
              >
                <path d="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 15,5L13.34,8.32C15.68,8.85 17.6,10 18.25,11.42C18.34,10.94 18.47,10.5 18.67,10.17C19.33,9 20.67,9 22,9C20.9,9 20.5,10.57 20.5,12.5C20.5,14.43 20.9,16 22,16C20.67,16 19.33,16 18.67,14.83C18.47,14.5 18.34,14.06 18.25,13.58C17.41,15.4 14.5,16.79 11.24,17L12,20Z" />
              </svg>
            </div>
          </div>
        )
      case "trash":
        return (
          <div className="w-12 h-12 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-9 text-blue-500"
            >
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          </div>
        )
    }
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-sm p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 min-h-[70px] sm:min-h-[80px] relative"
      style={{ 
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {/* Corner Alert Badge */}
      {hasAlert && (
        <div className="absolute -top-2 -right-2 z-10 animate-pulse">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))' }}
          >
            <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
          </svg>
        </div>
      )}
      {/* Map Thumbnail */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 border-2 border-gray-200">
        {mapThumbnail ? (
          <img
            src={mapThumbnail}
            alt="Zone location"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-gray-500 text-xs sm:text-sm truncate flex-1">{location}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <SeverityBadge severity={severity} />
          {timestamp && (
            <span className="text-xs text-gray-400">
              {formatTimeAgo(timestamp)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {renderIcon()}
      </div>
    </button>
  )
}

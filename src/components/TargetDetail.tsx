type TargetDetailProps = {
  location: string
  dissolvedOxygen: number
  temperature?: number
  warnings: number
  onClose?: () => void
}

export default function TargetDetail({
  location,
  dissolvedOxygen,
  temperature,
  warnings,
  onClose,
}: TargetDetailProps) {
  return (
    <div 
      className="w-full bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-3 sm:p-4 space-y-3 sm:space-y-4 border border-gray-100 animate-[fadeIn_0.25s_ease-out] will-change-transform cursor-pointer"
      style={{ transform: 'translateZ(0)' }}
      onClick={onClose}
    >
      {/* Top section with map and location */}
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Map thumbnail */}
        <div className="w-full sm:w-40 h-32 bg-teal-600 rounded-lg overflow-hidden relative shrink-0">
          <div className="absolute inset-0 opacity-60">
            {/* Placeholder for map - could integrate actual map later */}
            <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-700" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-red-500"
            >
              <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
            </svg>
          </div>
        </div>

        {/* DO and warnings section */}
        <div className="flex-1 space-y-2 sm:space-y-3 w-full">
          {/* Alert and DO level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
              >
                <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
              </svg>
              <span className="text-gray-600 text-base sm:text-lg font-medium">
                DO <span className="text-gray-400">{dissolvedOxygen.toFixed(1)}</span> mg/L
              </span>
            </div>
            
            {/* Temperature and close button - moved to top right on mobile */}
            <div className="flex items-center gap-2">
              {temperature && (
                <div className="flex items-center gap-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400"
                  >
                    <rect x="10" y="6" width="4" height="8" rx="2" fill="currentColor" />
                    <circle cx="12" cy="16" r="3" fill="currentColor" />
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2L15 8L12 14L9 8L12 2Z"
                    />
                  </svg>
                  <span className="text-gray-600 text-xs sm:text-sm">{temperature}°C</span>
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose?.()
                }}
                className="text-red-500 hover:text-red-600 hover:scale-110 active:scale-95 transition-transform duration-150 ease-out p-1 will-change-transform"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative">
            <div className="h-5 sm:h-6 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-full overflow-hidden" />
            
            {/* Position indicators */}
            <div className="absolute top-0 left-0 right-0 h-5 sm:h-6 flex items-center">
              {/* Good zone marker */}
              <div className="absolute left-[40%]">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-md"
                >
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
              </div>
              
              {/* Warning markers */}
              {[...Array(warnings)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${60 + i * 12}%` }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-md"
                  >
                    <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        >
          <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
        </svg>
        <span className="break-words">{location}</span>
      </div>
    </div>
  )
}

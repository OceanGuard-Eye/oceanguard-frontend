type TargetDetailProps = {
  location: string
  dissolvedOxygen: number
  temperature?: number
  warnings: number
  onClose?: () => void
  lat?: number
  lng?: number
}

// Helper to convert lat/lng to tile coordinates
function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = Math.pow(2, zoom)
  const x = Math.floor(((lng + 180) / 360) * n)
  const latRad = (lat * Math.PI) / 180
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
  return { x, y, z: zoom }
}

export default function TargetDetail({
  location,
  dissolvedOxygen,
  temperature,
  warnings,
  onClose,
  lat,
  lng,
}: TargetDetailProps) {
  // Generate satellite map thumbnail URL
  const mapThumbnail = lat && lng
    ? (() => {
        const { x, y, z } = latLngToTile(lat, lng, 11)
        return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
      })()
    : null
  return (
    <div 
      className="w-full bg-white rounded-xl shadow-xl p-3 sm:p-4 space-y-3 sm:space-y-4 border border-gray-100 animate-[fadeIn_0.25s_ease-out]"
      style={{ 
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
      onClick={onClose}
    >
      {/* Top section with map and location */}
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Map thumbnail with satellite imagery */}
        <div className="w-full sm:w-40 h-32 rounded-lg overflow-hidden relative shrink-0 border-2 border-gray-200">
          {mapThumbnail ? (
            <img
              src={mapThumbnail}
              alt="Zone satellite view"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700" />
          )}
          {/* Marker overlay - matching TargetPage style */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <div className="w-10 h-10 bg-blue-600 rounded-full border-3 border-white shadow-xl flex items-center justify-center ring-4 ring-blue-300">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* DO and warnings section */}
        <div className="flex-1 space-y-2 sm:space-y-3 w-full">
          {/* Alert and DO level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {warnings > 0 && (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
                >
                  <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                </svg>
              )}
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

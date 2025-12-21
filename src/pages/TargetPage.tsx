import { useState } from "react"

type ViewMode = "real" | "chlorophyll"

type LocationData = {
  id: number
  name: string
  lat: number
  lng: number
  metrics: {
    label: string
    value: string
    unit: string
    status: "good" | "warning" | "critical"
  }[]
}

const mockLocations: LocationData[] = [
  {
    id: 1,
    name: "Location A",
    lat: 13.7,
    lng: 100.5,
    metrics: [
      { label: "NH3-N", value: "##", unit: "mg/L", status: "critical" },
      { label: "NO2-, NO3-", value: "##", unit: "mg/L", status: "critical" },
      { label: "PO4-P", value: "##", unit: "mg/L", status: "warning" },
      { label: "E. coli", value: "##", unit: "CFU/100mL", status: "good" },
    ],
  },
]

export default function TargetPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("chlorophyll")
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  )

  return (
    <div className="relative w-full h-full">
      {/* Map Background */}
      <div className="absolute inset-0">
        <img
          src={viewMode === "real" ? "/src/assets/real.jpg" : "/src/assets/chrophyl.jpg"}
          alt="Map view"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* View Mode Toggle */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white rounded-full p-1 shadow-lg flex gap-1">
          <button
            onClick={() => setViewMode("real")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              viewMode === "real"
                ? "bg-mid-blue text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Real
          </button>
          <button
            onClick={() => setViewMode("chlorophyll")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              viewMode === "chlorophyll"
                ? "bg-mid-blue text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Chlorophyll
          </button>
        </div>
      </div>

      {/* Location Cards - Bottom */}
      {selectedLocation && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-4 animate-[slideUp_0.3s_ease-out]">
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedLocation.name}
              </h3>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-3">
              {selectedLocation.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-600 font-medium">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">
                      {metric.value} {metric.unit}
                    </span>
                    {metric.status === "critical" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-red-500"
                      >
                        <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                      </svg>
                    )}
                    {metric.status === "warning" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-orange-500"
                      >
                        <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                      </svg>
                    )}
                    {metric.status === "good" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-green-500"
                      >
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Location info */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
                <span>123 Anywhere St., Any City, ST 12345</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {mockLocations.map((location) => (
          <button
            key={location.id}
            onClick={() => setSelectedLocation(location)}
            className="absolute pointer-events-auto"
            style={{
              left: "50%",
              top: "40%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 text-red-500 drop-shadow-lg hover:scale-110 transition-transform"
            >
              <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

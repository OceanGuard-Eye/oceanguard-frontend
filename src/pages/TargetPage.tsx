import { useState } from "react"

type ViewMode = "real" | "chlorophyll"

type LocationData = {
  id: number
  name: string
  temperature: number
  dissolvedOxygen: number
  doStatus: "good" | "warning" | "critical"
  metrics: {
    label: string
    value: string
    unit: string
    status?: "good" | "warning" | "critical"
    hasBar?: boolean
    barColor?: string
  }[]
  phLevel: number
  phStatus: string
}

const mockLocation: LocationData = {
  id: 1,
  name: "123 Anywhere St., Any City, ST 12345",
  temperature: 29,
  dissolvedOxygen: 3.2,
  doStatus: "critical",
  phLevel: 7.8,
  phStatus: "Normal",
  metrics: [
    { label: "TSS", value: "##", unit: "mg/L", status: "warning", hasBar: true },
    { label: "EC", value: "##", unit: "uS/cm", hasBar: true, barColor: "orange" },
    { label: "TDS", value: "##", unit: "mg/L", hasBar: true, barColor: "blue" },
    { label: "Salinity", value: "##", unit: "ppt", status: "good" },
    { label: "ORP", value: "##", unit: "mV Oxide" },
    { label: "BOD", value: "##", unit: "mg/L", status: "good" },
    { label: "COD", value: "##", unit: "mg/L", hasBar: true, barColor: "orange" },
    { label: "NH3-N", value: "##", unit: "mg/L", status: "critical" },
    { label: "NO2-, NO3-", value: "##", unit: "mg/L", status: "critical" },
    { label: "PO4-P", value: "##", unit: "mg/L", status: "warning" },
    { label: "E. coli", value: "##", unit: "CFU/100mL", status: "good" },
    { label: "Heavy Metals", value: "##", unit: "mg/L" },
    { label: "Flow rate (Q)", value: "##", unit: "m³/day" },
  ],
}

export default function TargetPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("real")
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [timeSlider, setTimeSlider] = useState(1)

  return (
    <div className="relative w-full h-[calc(100vh-64px)]">
      {/* Map Background */}
      <div className="absolute inset-0">
        <img
          src={viewMode === "real" ? "/src/assets/real.jpg" : "/src/assets/chrophyl.jpg"}
          alt="Map view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* View Mode Toggle - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white rounded-full p-1 shadow-lg flex gap-1">
          <button
            onClick={() => setViewMode("real")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === "real"
                ? "bg-mid-blue text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Real
          </button>
          <button
            onClick={() => setViewMode("chlorophyll")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === "chlorophyll"
                ? "bg-mid-blue text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Chlorophyll
          </button>
        </div>
      </div>

      {/* Time Slider - Top Center */}
      {selectedLocation && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-xs text-red-500 font-medium">Now</span>
              <input
                type="range"
                min="0"
                max="3"
                value={timeSlider}
                onChange={(e) => setTimeSlider(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-xs text-gray-400">+12h</span>
              <span className="text-xs text-gray-400">+24h</span>
              <span className="text-xs text-gray-400">+48h</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Right Info Cards */}
      {selectedLocation && (
        <>
          <div className="absolute top-20 right-4 z-10 space-y-3">
            {/* Temperature & DO Card */}
            <div className="bg-white rounded-xl shadow-lg p-3 w-48">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                    <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                  </svg>
                  <span className="text-xs text-gray-400">○</span>
                </div>
                <span className="text-2xl font-bold text-gray-700">
                  {selectedLocation.temperature}°C
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-600">
                  DO <span className="text-gray-400">## mg/L</span>
                </div>
                <div className="h-6 bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-full relative">
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                      <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                      <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                      <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* pH Card */}
            <div className="bg-white rounded-xl shadow-lg p-3 w-48">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Ph</span>
                <span className="text-lg font-bold text-gray-700">{selectedLocation.phLevel}</span>
                <span className="text-xs text-gray-500">{selectedLocation.phStatus}</span>
              </div>
              <div className="h-6 bg-gradient-to-r from-pink-300 via-green-400 to-blue-400 rounded-full relative">
                <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                  <span>alkaline</span>
                  <span>Normal</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-sky-400">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Data Card - Left Side */}
      {selectedLocation && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-96">
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-h-[70vh] overflow-y-auto">
            {/* Metrics List */}
            <div className="space-y-3">
              {selectedLocation.metrics.map((metric, index) => (
                <div key={index} className="py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium text-sm">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">
                        {metric.value} {metric.unit}
                      </span>
                      {metric.status === "critical" && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                          <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                        </svg>
                      )}
                      {metric.status === "warning" && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-500">
                          <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                        </svg>
                      )}
                      {metric.status === "good" && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500">
                          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  {metric.hasBar && (
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          metric.barColor === 'orange' ? 'bg-gradient-to-r from-green-400 to-red-500' :
                          metric.barColor === 'blue' ? 'bg-gradient-to-r from-blue-400 to-green-400' :
                          'bg-gradient-to-r from-green-400 to-yellow-400'
                        }`}
                        style={{ width: '60%' }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Turbidity Chart */}
              <div className="py-3 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium text-sm">Turbidity</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  </svg>
                </div>
                <div className="h-16 bg-gradient-to-b from-green-100 to-transparent rounded relative">
                  <svg viewBox="0 0 100 40" className="w-full h-full">
                    <polyline
                      points="0,35 10,30 20,32 30,28 40,25 50,27 60,24 70,26 80,23 90,25 100,22"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-1">
                    <span>6 AM</span>
                    <span>6 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Address */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                </svg>
                <span>{selectedLocation.name}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1 ml-6">(เลื่อนได้)</div>
            </div>
          </div>
        </div>
      )}

      {/* Map Markers */}
      <div className="absolute inset-0 pointer-events-none">
        <button
          onClick={() => setSelectedLocation(mockLocation)}
          className="absolute pointer-events-auto left-1/2 top-1/3"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-red-500 drop-shadow-lg hover:scale-110 transition-transform">
            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

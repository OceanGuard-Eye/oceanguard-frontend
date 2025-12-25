import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type ViewMode = "real" | "chlorophyll"

type LocationData = {
  id: number
  name: string
  lat: number
  lng: number
  temperature: number
  dissolvedOxygen: number
  phLevel: number
  metrics: {
    label: string
    value: number | string
    unit: string
    status: "good" | "warning" | "critical"
    range?: { min: number; max: number; current: number }
  }[]
}

const mockLocations: LocationData[] = [
  {
    id: 1,
    name: "Gulf of Thailand - Zone A",
    lat: 13.2,
    lng: 100.85,
    temperature: 29,
    dissolvedOxygen: 5.2,
    phLevel: 7.8,
    metrics: [
      { label: "Chlorophyll", value: 4.2, unit: "µg/L", status: "warning" },
      { label: "E. coli Bacteria", value: 45, unit: "CFU", status: "warning" },
      { label: "Total Suspended Solid", value: 12, unit: "mg/L", status: "good" },
      { label: "CDOM", value: 0.8, unit: "m⁻¹", status: "good" },
      { label: "Turbidity", value: 3.5, unit: "NTU", status: "good" },
    ],
  },
  {
    id: 2,
    name: "Gulf of Thailand - Zone B",
    lat: 13.05,
    lng: 100.95,
    temperature: 28,
    dissolvedOxygen: 6.5,
    phLevel: 8.1,
    metrics: [
      { label: "Chlorophyll", value: 2.8, unit: "µg/L", status: "good" },
      { label: "E. coli Bacteria", value: 35, unit: "CFU", status: "good" },
      { label: "Total Suspended Solid", value: 8, unit: "mg/L", status: "good" },
      { label: "CDOM", value: 0.5, unit: "m⁻¹", status: "good" },
      { label: "Turbidity", value: 2.1, unit: "NTU", status: "good" },
    ],
  },
  {
    id: 3,
    name: "Gulf of Thailand - Zone C",
    lat: 12.9,
    lng: 101.05,
    temperature: 30,
    dissolvedOxygen: 4.8,
    phLevel: 7.9,
    metrics: [
      { label: "Chlorophyll", value: 8.5, unit: "µg/L", status: "warning" },
      { label: "E. coli Bacteria", value: 320, unit: "CFU", status: "critical" },
      { label: "Total Suspended Solid", value: 75, unit: "mg/L", status: "critical" },
      { label: "CDOM", value: 1.8, unit: "m⁻¹", status: "warning" },
      { label: "Turbidity", value: 8.2, unit: "NTU", status: "warning" },
    ],
  },
  {
    id: 4,
    name: "Gulf of Thailand - Zone D",
    lat: 13.15,
    lng: 101.1,
    temperature: 29,
    dissolvedOxygen: 5.8,
    phLevel: 8.0,
    metrics: [
      { label: "Chlorophyll", value: 3.2, unit: "µg/L", status: "good" },
      { label: "E. coli Bacteria", value: 65, unit: "CFU", status: "good" },
      { label: "Total Suspended Solid", value: 32, unit: "mg/L", status: "good" },
      { label: "CDOM", value: 0.6, unit: "m⁻¹", status: "good" },
      { label: "Turbidity", value: 2.8, unit: "NTU", status: "good" },
    ],
  },
  {
    id: 5,
    name: "Gulf of Thailand - Zone E",
    lat: 12.95,
    lng: 100.75,
    temperature: 28,
    dissolvedOxygen: 6.2,
    phLevel: 8.2,
    metrics: [
      { label: "Chlorophyll", value: 2.5, unit: "µg/L", status: "good" },
      { label: "E. coli Bacteria", value: 42, unit: "CFU", status: "good" },
      { label: "Total Suspended Solid", value: 22, unit: "mg/L", status: "good" },
      { label: "CDOM", value: 0.4, unit: "m⁻¹", status: "good" },
      { label: "Turbidity", value: 1.9, unit: "NTU", status: "good" },
    ],
  },
]

export default function TargetPage() {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("real")
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(mockLocations[0])
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map with bounds - Gulf of Thailand focus
    const map = L.map(mapContainerRef.current, {
      center: [13.05, 100.9],
      zoom: 9,
      zoomControl: false,
      minZoom: 8,
      maxZoom: 15,
      maxBounds: [[12.5, 100.3], [13.6, 101.5]], // Lock to Gulf of Thailand monitoring area
      maxBoundsViscosity: 1.0,
    })

    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Add tile layer
    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }
    )
    tileLayer.addTo(map)

    // Add markers for locations
    mockLocations.forEach((location) => {
      const isSelected = selectedLocation?.id === location.id
      const marker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div class="relative">
            <div class="w-12 h-12 ${isSelected ? 'bg-mid-blue' : 'bg-red-500'} rounded-full border-4 border-white shadow-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${isSelected ? 'scale-125' : ''}">
              <svg viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            ${isSelected ? '<div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">' + location.name + '</div>' : ''}
          </div>`,
          iconSize: [48, 48],
          iconAnchor: [24, 48],
        }),
      })
      marker.addTo(map)
      marker.on('click', () => {
        setSelectedLocation(location)
        map.setView([location.lat, location.lng], 10, { animate: true })
      })
      markersRef.current.push(marker)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = []
    }
  }, [])

  // Update markers when selected location changes
  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach((marker) => mapRef.current?.removeLayer(marker))
    markersRef.current = []

    mockLocations.forEach((location) => {
      const isSelected = selectedLocation?.id === location.id
      const statusColor = location.metrics.some(m => m.status === 'critical') 
        ? 'bg-red-500' 
        : location.metrics.some(m => m.status === 'warning')
        ? 'bg-orange-500'
        : 'bg-green-500'

      const marker = L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div class="relative animate-[bounce_1s_ease-in-out_infinite]">
            <div class="w-12 h-12 ${isSelected ? 'bg-blue-600 scale-125 ring-4 ring-blue-300' : statusColor} rounded-full border-4 border-white shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
              <svg viewBox="0 0 24 24" fill="white" class="w-6 h-6">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </div>`,
          iconSize: [48, 56],
          iconAnchor: [24, 56],
        }),
      })
      marker.addTo(mapRef.current!)
      marker.on('click', () => {
        setSelectedLocation(location)
        mapRef.current?.setView([location.lat, location.lng], 10, { animate: true, duration: 1 })
      })
      markersRef.current.push(marker)
    })
  }, [selectedLocation])

  // Update tile layer when view mode changes
  useEffect(() => {
    if (!mapRef.current) return
    
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapRef.current?.removeLayer(layer)
      }
    })

    const newTileLayer = L.tileLayer(
      viewMode === "real"
        ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }
    )
    newTileLayer.addTo(mapRef.current)
  }, [viewMode])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-500"
      case "warning": return "text-orange-500"
      case "good": return "text-green-500"
      default: return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === "critical" || status === "warning") {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${getStatusColor(status)}`}>
          <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${getStatusColor(status)}`}>
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
    )
  }

  return (
    <div className="relative w-full h-[calc(100vh-112px)] overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0" />

      {/* Modern Control Panel - Top Left */}
      <div className="absolute top-6 left-6 z-10 space-y-3">
        {/* View Mode Toggle */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-1.5 shadow-xl">
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode("real")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                viewMode === "real"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setViewMode("chlorophyll")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                viewMode === "chlorophyll"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Imagery
            </button>
          </div>
        </div>
      </div>

      {/* Data Panel - Left Side */}
      {selectedLocation && (
        <div className="absolute left-6 top-32 bottom-24 z-10 w-96">
          <div className="h-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Water Quality Data</h3>
                  <div className="flex items-center gap-2 text-blue-100 text-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                    </svg>
                    <span>{selectedLocation.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Metrics List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {selectedLocation.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">
                        {metric.value} <span className="text-sm text-gray-500">{metric.unit}</span>
                      </span>
                      {getStatusIcon(metric.status)}
                    </div>
                  </div>
                  {metric.range && (
                    <div className="relative">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            metric.status === "critical"
                              ? "bg-gradient-to-r from-red-400 to-red-600"
                              : metric.status === "warning"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                              : "bg-gradient-to-r from-green-400 to-green-600"
                          }`}
                          style={{ width: `${(metric.range.current / metric.range.max) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{metric.range.min}</span>
                        <span>{metric.range.max}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Cards - Top Right */}
      {selectedLocation && (
        <div className="absolute top-6 right-6 z-10 space-y-3 w-72">
          {/* Temperature */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Temperature</p>
                <p className="text-3xl font-bold">{selectedLocation.temperature}°C</p>
              </div>
              <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 opacity-80">
                <path d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z" />
              </svg>
            </div>
          </div>

          {/* Dissolved Oxygen */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Dissolved O₂</p>
                <p className="text-3xl font-bold">{selectedLocation.dissolvedOxygen} mg/L</p>
              </div>
              <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 opacity-80">
                <path d="M12,2C8.13,2 5,5.13 5,9C5,12.38 9.5,19.5 12,22C14.5,19.5 19,12.38 19,9C19,5.13 15.87,2 12,2M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5Z" />
              </svg>
            </div>
          </div>

          {/* pH Level */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">pH Level</p>
                <p className="text-3xl font-bold">{selectedLocation.phLevel}</p>
              </div>
              <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 opacity-80">
                <path d="M7,2V4H8V18A4,4 0 0,0 12,22A4,4 0 0,0 16,18V4H17V2H7M11,16C10.4,16 10,15.6 10,15C10,14.4 10.4,14 11,14C11.6,14 12,14.4 12,15C12,15.6 11.6,16 11,16M13,12C12.4,12 12,11.6 12,11C12,10.4 12.4,10 13,10C13.6,10 14,10.4 14,11C14,11.6 13.6,12 13,12M14,7H10V4H14V7Z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Location List - Right Bottom */}
      <div className="absolute bottom-24 right-6 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 w-80">
          <h4 className="font-bold text-gray-800 mb-3 text-sm">Monitoring Stations ({mockLocations.length})</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {mockLocations.map((location) => {
              const hasIssues = location.metrics.some(m => m.status !== 'good')
              const criticalCount = location.metrics.filter(m => m.status === 'critical').length
              const warningCount = location.metrics.filter(m => m.status === 'warning').length
              
              return (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location)
                    mapRef.current?.setView([location.lat, location.lng], 10, { animate: true })
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedLocation?.id === location.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${selectedLocation?.id === location.id ? 'text-white' : 'text-gray-800'}`}>
                        {location.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {criticalCount > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedLocation?.id === location.id 
                              ? 'bg-red-200 text-red-800' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {criticalCount} Critical
                          </span>
                        )}
                        {warningCount > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedLocation?.id === location.id 
                              ? 'bg-orange-200 text-orange-800' 
                              : 'bg-orange-100 text-orange-600'
                          }`}>
                            {warningCount} Warning
                          </span>
                        )}
                        {!hasIssues && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedLocation?.id === location.id 
                              ? 'bg-green-200 text-green-800' 
                              : 'bg-green-100 text-green-600'
                          }`}>
                            All Good
                          </span>
                        )}
                      </div>
                    </div>
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className={`w-5 h-5 ${selectedLocation?.id === location.id ? 'text-white' : 'text-gray-400'}`}
                    >
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

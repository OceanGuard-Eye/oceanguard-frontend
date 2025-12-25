import { useState, useMemo } from "react"
import { formatTimeAgo, getSeverityColor, type SeverityLevel } from "../utils/formatters"

type ZoneOverview = {
  id: number
  name: string
  province: string
  status: SeverityLevel
  dissolvedOxygen: number
  temperature: number
  phLevel: number
  chlorophyll: number
  turbidity: number
  ecoliBacteria: number
  lastUpdated: Date
  activeAlerts: number
  lat: number
  lng: number
}

const mockZones: ZoneOverview[] = [
  {
    id: 1,
    name: "Gulf of Thailand - Zone A",
    province: "Rayong",
    status: "warning",
    dissolvedOxygen: 5.2,
    temperature: 29,
    phLevel: 7.8,
    chlorophyll: 4.2,
    turbidity: 3.5,
    ecoliBacteria: 45,
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
    activeAlerts: 2,
    lat: 13.2,
    lng: 100.85,
  },
  {
    id: 2,
    name: "Gulf of Thailand - Zone B",
    province: "Chonburi",
    status: "normal",
    dissolvedOxygen: 6.5,
    temperature: 28,
    phLevel: 8.1,
    chlorophyll: 2.8,
    turbidity: 2.1,
    ecoliBacteria: 35,
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
    activeAlerts: 0,
    lat: 13.05,
    lng: 100.95,
  },
  {
    id: 3,
    name: "Gulf of Thailand - Zone C",
    province: "Chanthaburi",
    status: "critical",
    dissolvedOxygen: 3.8,
    temperature: 30,
    phLevel: 7.9,
    chlorophyll: 8.5,
    turbidity: 8.2,
    ecoliBacteria: 320,
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
    activeAlerts: 4,
    lat: 12.9,
    lng: 101.05,
  },
  {
    id: 4,
    name: "Gulf of Thailand - Zone D",
    province: "Trat",
    status: "normal",
    dissolvedOxygen: 5.8,
    temperature: 29,
    phLevel: 8.0,
    chlorophyll: 3.2,
    turbidity: 2.8,
    ecoliBacteria: 65,
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
    activeAlerts: 0,
    lat: 13.15,
    lng: 101.1,
  },
  {
    id: 5,
    name: "Gulf of Thailand - Zone E",
    province: "Samut Prakan",
    status: "normal",
    dissolvedOxygen: 6.2,
    temperature: 28,
    phLevel: 8.2,
    chlorophyll: 2.5,
    turbidity: 1.9,
    ecoliBacteria: 42,
    lastUpdated: new Date(Date.now() - 8 * 60 * 1000),
    activeAlerts: 0,
    lat: 12.95,
    lng: 100.75,
  },
]

// Helper to convert lat/lng to tile coordinates for satellite thumbnail
function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = Math.pow(2, zoom)
  const x = Math.floor(((lng + 180) / 360) * n)
  const latRad = (lat * Math.PI) / 180
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
  return { x, y, z: zoom }
}

type StatCardProps = {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  color: string
  trend?: "up" | "down" | "stable"
}

function StatCard({ title, value, subtitle, icon, color, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"
          }`}>
            {trend === "up" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {trend === "down" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {trend === "stable" && <span>—</span>}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

type ZoneRowProps = {
  zone: ZoneOverview
  isSelected: boolean
  onClick: () => void
}

function ZoneRow({ zone, isSelected, onClick }: ZoneRowProps) {
  const { x, y, z } = latLngToTile(zone.lat, zone.lng, 10)
  const thumbnailUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`
  
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
        isSelected
          ? "bg-mid-blue/10 border-2 border-mid-blue"
          : "bg-white hover:bg-gray-50 border-2 border-transparent"
      }`}
    >
      {/* Mini satellite thumbnail */}
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 shrink-0 relative">
        <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
        <div className={`absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full ${getSeverityColor(zone.status)} border border-white`} />
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-900">{zone.name}</p>
        <p className="text-xs text-gray-500">{zone.province} • {formatTimeAgo(zone.lastUpdated)}</p>
      </div>
      {zone.activeAlerts > 0 && (
        <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
          {zone.activeAlerts}
        </span>
      )}
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<ZoneOverview | null>(null)

  const stats = useMemo(() => {
    const totalZones = mockZones.length
    const criticalCount = mockZones.filter((z) => z.status === "critical").length
    const warningCount = mockZones.filter((z) => z.status === "warning").length
    const normalCount = mockZones.filter((z) => z.status === "normal").length
    const totalAlerts = mockZones.reduce((sum, z) => sum + z.activeAlerts, 0)
    const avgDO = mockZones.reduce((sum, z) => sum + z.dissolvedOxygen, 0) / totalZones
    const avgTemp = mockZones.reduce((sum, z) => sum + z.temperature, 0) / totalZones
    const avgTurbidity = mockZones.reduce((sum, z) => sum + z.turbidity, 0) / totalZones

    return {
      totalZones,
      criticalCount,
      warningCount,
      normalCount,
      totalAlerts,
      avgDO: avgDO.toFixed(1),
      avgTemp: avgTemp.toFixed(1),
      avgTurbidity: avgTurbidity.toFixed(1),
    }
  }, [])

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="animate-[slideUp_0.5s_ease-out]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Ocean Monitoring</h1>
            <p className="text-sm text-gray-600">Gulf of Thailand • 5 Active Zones</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-[slideUp_0.5s_ease-out]"
        style={{ animationDelay: "0.1s", animationFillMode: "both" }}
      >
        <StatCard
          title="Zones"
          value={stats.totalZones}
          subtitle="Active monitoring"
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          }
          color="bg-mid-blue"
          trend="stable"
        />
        <StatCard
          title="Alerts"
          value={stats.totalAlerts}
          subtitle={stats.criticalCount > 0 ? `${stats.criticalCount} critical` : "All clear"}
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
            </svg>
          }
          color={stats.totalAlerts > 0 ? "bg-red-500" : "bg-green-500"}
          trend={stats.totalAlerts > 0 ? "up" : "stable"}
        />
        <StatCard
          title="Avg. DO"
          value={`${stats.avgDO}`}
          subtitle="mg/L"
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" />
            </svg>
          }
          color="bg-cyan-500"
          trend="stable"
        />
        <StatCard
          title="Turbidity"
          value={`${stats.avgTurbidity}`}
          subtitle="NTU avg"
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97L14.47,9.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z" />
            </svg>
          }
          color="bg-amber-500"
          trend="down"
        />
      </div>

      {/* Status Summary Bar */}
      <div
        className="bg-white rounded-xl shadow-sm p-4 animate-[slideUp_0.5s_ease-out]"
        style={{ animationDelay: "0.2s", animationFillMode: "both" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Zone Status</h2>
          <span className="text-xs text-gray-500">Real-time monitoring</span>
        </div>
        <div className="flex gap-2 h-3 rounded-full overflow-hidden bg-gray-100">
          {stats.criticalCount > 0 && (
            <div
              className="bg-red-500 transition-all"
              style={{ width: `${(stats.criticalCount / stats.totalZones) * 100}%` }}
            />
          )}
          {stats.warningCount > 0 && (
            <div
              className="bg-orange-500 transition-all"
              style={{ width: `${(stats.warningCount / stats.totalZones) * 100}%` }}
            />
          )}
          {stats.normalCount > 0 && (
            <div
              className="bg-green-500 transition-all"
              style={{ width: `${(stats.normalCount / stats.totalZones) * 100}%` }}
            />
          )}
        </div>
        <div className="flex items-center justify-center gap-6 mt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-gray-600">Critical ({stats.criticalCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-gray-600">Warning ({stats.warningCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-gray-600">Normal ({stats.normalCount})</span>
          </div>
        </div>
      </div>

      {/* Zone List and Details */}
      <div
        className="grid md:grid-cols-2 gap-4 animate-[slideUp_0.5s_ease-out]"
        style={{ animationDelay: "0.3s", animationFillMode: "both" }}
      >
        {/* Zone List */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Monitoring Zones</h2>
          <div className="space-y-2">
            {mockZones.map((zone) => (
              <ZoneRow
                key={zone.id}
                zone={zone}
                isSelected={selectedZone?.id === zone.id}
                onClick={() => setSelectedZone(zone)}
              />
            ))}
          </div>
        </div>

        {/* Zone Details */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Zone Details</h2>
          {selectedZone ? (
            <div className="space-y-4">
              {/* Zone header with satellite thumbnail */}
              <div className="flex items-start gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0 relative border-2 border-gray-300">
                  <img 
                    src={`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${latLngToTile(selectedZone.lat, selectedZone.lng, 11).z}/${latLngToTile(selectedZone.lat, selectedZone.lng, 11).y}/${latLngToTile(selectedZone.lat, selectedZone.lng, 11).x}`}
                    alt="Zone satellite view"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-4 h-4 rounded-full ${getSeverityColor(selectedZone.status)} border-2 border-white shadow-lg`} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{selectedZone.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full text-white ${getSeverityColor(selectedZone.status)}`}>
                      {selectedZone.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedZone.province}, Thailand</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Updated {formatTimeAgo(selectedZone.lastUpdated)}
                  </p>
                </div>
              </div>

              {/* Water Quality Metrics */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Water Quality</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-cyan-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-cyan-700">{selectedZone.dissolvedOxygen}</p>
                    <p className="text-xs text-cyan-600">DO (mg/L)</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-blue-700">{selectedZone.phLevel}</p>
                    <p className="text-xs text-blue-600">pH Level</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-orange-700">{selectedZone.temperature}°</p>
                    <p className="text-xs text-orange-600">Temp (°C)</p>
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Environmental Indicators</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-green-700">{selectedZone.chlorophyll}</p>
                    <p className="text-xs text-green-600">Chloro (µg/L)</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-amber-700">{selectedZone.turbidity}</p>
                    <p className="text-xs text-amber-600">Turbidity</p>
                  </div>
                  <div className={`rounded-lg p-2 text-center ${selectedZone.ecoliBacteria > 100 ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <p className={`text-lg font-bold ${selectedZone.ecoliBacteria > 100 ? 'text-red-700' : 'text-gray-700'}`}>{selectedZone.ecoliBacteria}</p>
                    <p className={`text-xs ${selectedZone.ecoliBacteria > 100 ? 'text-red-600' : 'text-gray-600'}`}>E.coli (CFU)</p>
                  </div>
                </div>
              </div>

              {selectedZone.activeAlerts > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
                    </svg>
                    <p className="text-sm font-medium text-red-700">
                      {selectedZone.activeAlerts} Active Alert{selectedZone.activeAlerts > 1 ? "s" : ""}
                    </p>
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                    Immediate attention required
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Select a zone</p>
              <p className="text-sm text-gray-400">Click on a zone to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

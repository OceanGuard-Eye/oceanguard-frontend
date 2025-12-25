import { useState, useMemo } from "react"
import { formatTimeAgo, getSeverityColor, type SeverityLevel } from "../utils/formatters"

// Aligned with PTTEP Ocean for Life strategy - 3 Pillars
type OceanPillar = "protect" | "preserve" | "provide"

type ZoneOverview = {
  id: number
  name: string
  province: string
  status: SeverityLevel
  // Water Quality (Protect)
  dissolvedOxygen: number
  temperature: number
  phLevel: number
  chlorophyll: number
  microplastics: number // particles per liter
  // Marine Health (Preserve)
  biodiversityIndex: number // 0-100
  coralHealth: number // 0-100%
  seagrassHealth: number // 0-100%
  // Community Impact (Provide)
  fishStock: number // relative abundance
  blueCarbon: number // tons CO2/hectare
  lastUpdated: Date
  activeAlerts: number
  pillarFocus: OceanPillar
}

const mockZones: ZoneOverview[] = [
  {
    id: 1,
    name: "Zone A",
    province: "Rayong",
    status: "warning",
    dissolvedOxygen: 5.2,
    temperature: 29,
    phLevel: 7.8,
    chlorophyll: 4.2,
    microplastics: 45,
    biodiversityIndex: 72,
    coralHealth: 68,
    seagrassHealth: 75,
    fishStock: 82,
    blueCarbon: 12.5,
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
    activeAlerts: 2,
    pillarFocus: "protect",
  },
  {
    id: 2,
    name: "Zone B",
    province: "Chonburi",
    status: "normal",
    dissolvedOxygen: 6.5,
    temperature: 28,
    phLevel: 8.1,
    chlorophyll: 2.8,
    microplastics: 22,
    biodiversityIndex: 85,
    coralHealth: 82,
    seagrassHealth: 88,
    fishStock: 91,
    blueCarbon: 18.2,
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
    activeAlerts: 0,
    pillarFocus: "preserve",
  },
  {
    id: 3,
    name: "Zone C",
    province: "Chanthaburi",
    status: "critical",
    dissolvedOxygen: 3.8,
    temperature: 30,
    phLevel: 7.9,
    chlorophyll: 8.5,
    microplastics: 120,
    biodiversityIndex: 45,
    coralHealth: 35,
    seagrassHealth: 42,
    fishStock: 55,
    blueCarbon: 6.8,
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
    activeAlerts: 4,
    pillarFocus: "protect",
  },
  {
    id: 4,
    name: "Zone D",
    province: "Trat",
    status: "normal",
    dissolvedOxygen: 5.8,
    temperature: 29,
    phLevel: 8.0,
    chlorophyll: 3.2,
    microplastics: 35,
    biodiversityIndex: 78,
    coralHealth: 75,
    seagrassHealth: 80,
    fishStock: 88,
    blueCarbon: 15.3,
    lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
    activeAlerts: 0,
    pillarFocus: "provide",
  },
  {
    id: 5,
    name: "Zone E",
    province: "Samut Prakan",
    status: "normal",
    dissolvedOxygen: 6.2,
    temperature: 28,
    phLevel: 8.2,
    chlorophyll: 2.5,
    microplastics: 28,
    biodiversityIndex: 80,
    coralHealth: 78,
    seagrassHealth: 85,
    fishStock: 86,
    blueCarbon: 14.7,
    lastUpdated: new Date(Date.now() - 8 * 60 * 1000),
    activeAlerts: 0,
    pillarFocus: "preserve",
  },
]

// Pillar colors and labels aligned with Ocean for Life
const pillarConfig = {
  protect: { color: "bg-red-500", label: "Protect", icon: "🛡️" },
  preserve: { color: "bg-green-500", label: "Preserve", icon: "🌿" },
  provide: { color: "bg-blue-500", label: "Provide", icon: "🤝" },
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
  const pillar = pillarConfig[zone.pillarFocus]
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
        isSelected
          ? "bg-mid-blue/10 border-2 border-mid-blue"
          : "bg-white hover:bg-gray-50 border-2 border-transparent"
      }`}
    >
      <div className={`w-3 h-3 rounded-full ${getSeverityColor(zone.status)}`} />
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900">{zone.name}</p>
          <span className={`text-xs px-1.5 py-0.5 rounded ${pillar.color} text-white`}>
            {pillar.icon}
          </span>
        </div>
        <p className="text-xs text-gray-500">{zone.province} • {formatTimeAgo(zone.lastUpdated)}</p>
      </div>
      {zone.activeAlerts > 0 && (
        <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
          {zone.activeAlerts} alert{zone.activeAlerts > 1 ? "s" : ""}
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
    const avgBiodiversity = mockZones.reduce((sum, z) => sum + z.biodiversityIndex, 0) / totalZones
    const totalBlueCarbon = mockZones.reduce((sum, z) => sum + z.blueCarbon, 0)
    const avgMicroplastics = mockZones.reduce((sum, z) => sum + z.microplastics, 0) / totalZones

    return {
      totalZones,
      criticalCount,
      warningCount,
      normalCount,
      totalAlerts,
      avgDO: avgDO.toFixed(1),
      avgTemp: avgTemp.toFixed(1),
      avgBiodiversity: Math.round(avgBiodiversity),
      totalBlueCarbon: totalBlueCarbon.toFixed(1),
      avgMicroplastics: Math.round(avgMicroplastics),
    }
  }, [])

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="animate-[slideUp_0.5s_ease-out]">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-gray-900">Ocean for Life</h1>
          <span className="text-xs bg-mid-blue text-white px-2 py-0.5 rounded-full">SDG 14</span>
        </div>
        <p className="text-sm text-gray-600">Gulf of Thailand Monitoring Network • 17 Provinces</p>
      </div>

      {/* Ocean for Life Pillars */}
      <div
        className="grid grid-cols-3 gap-2 animate-[slideUp_0.5s_ease-out]"
        style={{ animationDelay: "0.05s", animationFillMode: "both" }}
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          <span className="text-2xl">🛡️</span>
          <p className="text-xs font-semibold text-red-700 mt-1">Protect</p>
          <p className="text-xs text-red-600">Pollution Control</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <span className="text-2xl">🌿</span>
          <p className="text-xs font-semibold text-green-700 mt-1">Preserve</p>
          <p className="text-xs text-green-600">Biodiversity</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <span className="text-2xl">🤝</span>
          <p className="text-xs font-semibold text-blue-700 mt-1">Provide</p>
          <p className="text-xs text-blue-600">Community</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-[slideUp_0.5s_ease-out]"
        style={{ animationDelay: "0.1s", animationFillMode: "both" }}
      >
        <StatCard
          title="Biodiversity"
          value={`${stats.avgBiodiversity}%`}
          subtitle="Health Index"
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 15,5L13.34,8.32C15.68,8.85 17.6,10 18.25,11.42C18.34,10.94 18.47,10.5 18.67,10.17C19.33,9 20.67,9 22,9C20.9,9 20.5,10.57 20.5,12.5C20.5,14.43 20.9,16 22,16C20.67,16 19.33,16 18.67,14.83C18.47,14.5 18.34,14.06 18.25,13.58C17.41,15.4 14.5,16.79 11.24,17L12,20Z" />
            </svg>
          }
          color="bg-green-500"
          trend="up"
        />
        <StatCard
          title="Blue Carbon"
          value={`${stats.totalBlueCarbon}t`}
          subtitle="CO₂ Captured"
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          }
          color="bg-teal-500"
          trend="up"
        />
        <StatCard
          title="Microplastics"
          value={`${stats.avgMicroplastics}`}
          subtitle="particles/L avg"
          icon={
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
            </svg>
          }
          color={stats.avgMicroplastics > 50 ? "bg-red-500" : "bg-orange-500"}
          trend={stats.avgMicroplastics > 50 ? "up" : "down"}
        />
        <StatCard
          title="Active Alerts"
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
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${getSeverityColor(selectedZone.status)}`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Gulf of Thailand - {selectedZone.name}</p>
                  <p className="text-xs text-gray-500">
                    {selectedZone.province} • {formatTimeAgo(selectedZone.lastUpdated)}
                  </p>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${pillarConfig[selectedZone.pillarFocus].color} text-white`}>
                  {pillarConfig[selectedZone.pillarFocus].icon} {pillarConfig[selectedZone.pillarFocus].label}
                </span>
              </div>

              {/* Water Quality - Protect */}
              <div>
                <p className="text-xs font-medium text-red-600 mb-2 flex items-center gap-1">
                  🛡️ Water Quality (Protect)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">DO</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedZone.dissolvedOxygen} mg/L</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">pH</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedZone.phLevel}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Temperature</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedZone.temperature}°C</p>
                  </div>
                  <div className={`rounded-lg p-2 ${selectedZone.microplastics > 50 ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-500">Microplastics</p>
                    <p className={`text-sm font-semibold ${selectedZone.microplastics > 50 ? 'text-red-600' : 'text-gray-900'}`}>
                      {selectedZone.microplastics} /L
                    </p>
                  </div>
                </div>
              </div>

              {/* Marine Health - Preserve */}
              <div>
                <p className="text-xs font-medium text-green-600 mb-2 flex items-center gap-1">
                  🌿 Marine Health (Preserve)
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">Biodiversity</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${selectedZone.biodiversityIndex}%` }} />
                    </div>
                    <span className="text-xs font-medium w-10">{selectedZone.biodiversityIndex}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">Coral</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500" style={{ width: `${selectedZone.coralHealth}%` }} />
                    </div>
                    <span className="text-xs font-medium w-10">{selectedZone.coralHealth}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">Seagrass</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500" style={{ width: `${selectedZone.seagrassHealth}%` }} />
                    </div>
                    <span className="text-xs font-medium w-10">{selectedZone.seagrassHealth}%</span>
                  </div>
                </div>
              </div>

              {/* Community Impact - Provide */}
              <div>
                <p className="text-xs font-medium text-blue-600 mb-2 flex items-center gap-1">
                  🤝 Community Impact (Provide)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Fish Stock</p>
                    <p className="text-sm font-semibold text-blue-700">{selectedZone.fishStock}%</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Blue Carbon</p>
                    <p className="text-sm font-semibold text-teal-700">{selectedZone.blueCarbon} t/ha</p>
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
                    Immediate attention required for this zone
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

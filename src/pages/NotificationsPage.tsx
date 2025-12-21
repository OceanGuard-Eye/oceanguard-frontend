import { useState, useMemo } from "react"
import TargetCard from "../components/TargetCard"
import TargetDetail from "../components/TargetDetail"
import SearchBar from "../components/SearchBar"
import FilterChip from "../components/FilterChip"
import EmptyState from "../components/EmptyState"
import SkeletonCard from "../components/SkeletonCard"

type TargetLocation = {
  id: number
  location: string
  icon: "temperature" | "fish" | "trash"
  dissolvedOxygen: number
  temperature?: number
  warnings: number
  timestamp: Date
}

type SeverityLevel = "critical" | "warning" | "normal" | "all"

const mockTargets: TargetLocation[] = [
  {
    id: 1,
    location: "Gulf of Thailand - Zone A",
    icon: "temperature",
    dissolvedOxygen: 3.2,
    temperature: 29,
    warnings: 3,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    location: "Gulf of Thailand - Zone B",
    icon: "fish",
    dissolvedOxygen: 5.8,
    warnings: 1,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 3,
    location: "Gulf of Thailand - Zone C",
    icon: "trash",
    dissolvedOxygen: 7.2,
    warnings: 0,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 4,
    location: "Gulf of Thailand - Zone D",
    icon: "temperature",
    dissolvedOxygen: 2.8,
    temperature: 31,
    warnings: 4,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 5,
    location: "Gulf of Thailand - Zone E",
    icon: "fish",
    dissolvedOxygen: 8.1,
    warnings: 0,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
]

const getSeverity = (target: TargetLocation): Exclude<SeverityLevel, "all"> => {
  if (target.dissolvedOxygen < 4) return "critical"
  if (target.dissolvedOxygen < 6 || target.warnings > 0) return "warning"
  return "normal"
}

export default function NotificationsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [collapsingId, setCollapsingId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSeverity, setActiveSeverity] = useState<SeverityLevel>("all")
  const [isLoading] = useState(false)

  const handleCardClick = (id: number) => {
    if (expandedId === id) {
      setCollapsingId(id)
      setTimeout(() => {
        setExpandedId(null)
        setCollapsingId(null)
      }, 250)
    } else if (expandedId !== null) {
      setCollapsingId(expandedId)
      setTimeout(() => {
        setExpandedId(id)
        setCollapsingId(null)
      }, 250)
    } else {
      setExpandedId(id)
    }
  }

  const filteredTargets = useMemo(() => {
    return mockTargets.filter((target) => {
      const matchesSearch = target.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const targetSeverity = getSeverity(target)
      const matchesSeverity =
        activeSeverity === "all" || targetSeverity === activeSeverity
      return matchesSearch && matchesSeverity
    })
  }, [searchQuery, activeSeverity])

  const severityCounts = useMemo(() => {
    const counts = { critical: 0, warning: 0, normal: 0 }
    mockTargets.forEach((target) => {
      counts[getSeverity(target)]++
    })
    return counts
  }, [])

  return (
    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
      <div className="w-full animate-[slideUp_0.5s_ease-out]">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by location..."
        />
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-2 -mx-[4vw] px-[4vw] sm:mx-0 sm:px-0 scrollbar-hide animate-[slideUp_0.5s_ease-out]"
        style={{ animationDelay: "0.1s", animationFillMode: "both" }}
      >
        <FilterChip
          label="All"
          active={activeSeverity === "all"}
          count={mockTargets.length}
          onClick={() => setActiveSeverity("all")}
          color="gray"
        />
        <FilterChip
          label="Critical"
          active={activeSeverity === "critical"}
          count={severityCounts.critical}
          onClick={() => setActiveSeverity("critical")}
          color="red"
        />
        <FilterChip
          label="Warning"
          active={activeSeverity === "warning"}
          count={severityCounts.warning}
          onClick={() => setActiveSeverity("warning")}
          color="orange"
        />
        <FilterChip
          label="Normal"
          active={activeSeverity === "normal"}
          count={severityCounts.normal}
          onClick={() => setActiveSeverity("normal")}
          color="green"
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredTargets.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No matching locations" : "No targets available"}
          message={
            searchQuery
              ? "Try a different search term or adjust filters"
              : "Check back later for monitoring data"
          }
        />
      ) : (
        <div className="space-y-3 md:space-y-4">
          {filteredTargets.map((target, index) => (
            <div
              key={target.id}
              className="animate-[slideUp_0.5s_ease-out]"
              style={{
                animationDelay: `${0.1 + index * 0.05}s`,
                animationFillMode: "both",
              }}
            >
              {expandedId === target.id ? (
                <div className={collapsingId === target.id ? 'animate-[fadeOut_0.25s_ease-out]' : ''}>
                  <TargetDetail
                    location={target.location}
                    dissolvedOxygen={target.dissolvedOxygen}
                    temperature={target.temperature}
                    warnings={target.warnings}
                    onClose={() => handleCardClick(target.id)}
                  />
                </div>
              ) : (
                <TargetCard
                  location={target.location}
                  icon={target.icon}
                  hasAlert={target.warnings > 0}
                  severity={getSeverity(target)}
                  timestamp={target.timestamp}
                  onClick={() => handleCardClick(target.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

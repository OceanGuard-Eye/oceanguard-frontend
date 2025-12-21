import { useState, useMemo } from "react"
import TargetCard from "../components/TargetCard"
import TargetDetail from "../components/TargetDetail"
import SearchBar from "../components/SearchBar"
import FilterChip from "../components/FilterChip"
import EmptyState from "../components/EmptyState"
import SkeletonCard from "../components/SkeletonCard"
import { SeverityLevel } from "../utils/formatters"

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
    location: "123 Anywhere St., Any City, ST 12345",
    icon: "temperature",
    dissolvedOxygen: 3.2,
    temperature: 29,
    warnings: 3,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    location: "456 Beach Rd., Coastal City, ST 67890",
    icon: "fish",
    dissolvedOxygen: 5.8,
    warnings: 1,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
  },
  {
    id: 3,
    location: "789 Harbor Ave., Port Town, ST 11223",
    icon: "trash",
    dissolvedOxygen: 7.2,
    warnings: 0,
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
  },
  {
    id: 4,
    location: "321 River St., Waterside, ST 44556",
    icon: "temperature",
    dissolvedOxygen: 2.8,
    temperature: 31,
    warnings: 4,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 5,
    location: "654 Ocean Blvd., Marine City, ST 77889",
    icon: "fish",
    dissolvedOxygen: 8.1,
    warnings: 0,
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 min ago
  },
]

const getSeverity = (target: TargetLocation): Exclude<SeverityLevel, "all"> => {
  if (target.dissolvedOxygen < 4) return "critical"
  if (target.dissolvedOxygen < 6 || target.warnings > 0) return "warning"
  return "normal"
}

export default function TargetPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSeverity, setActiveSeverity] = useState<SeverityLevel>("all")
  const [isLoading, setIsLoading] = useState(false)

  const handleCardClick = (id: number) => {
    if (expandedId !== null && expandedId !== id) {
      // Collapse current, then expand new one
      setExpandedId(null)
      setTimeout(() => setExpandedId(id), 300)
    } else {
      setExpandedId(id)
    }
  }

  // Filter and search logic
  const filteredTargets = useMemo(() => {
    return mockTargets.filter((target) => {
      // Search filter
      const matchesSearch = target.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      // Severity filter
      const targetSeverity = getSeverity(target)
      const matchesSeverity =
        activeSeverity === "all" || targetSeverity === activeSeverity

      return matchesSearch && matchesSeverity
    })
  }, [searchQuery, activeSeverity])

  // Count by severity
  const severityCounts = useMemo(() => {
    const counts = {
      critical: 0,
      warning: 0,
      normal: 0,
    }
    mockTargets.forEach((target) => {
      counts[getSeverity(target)]++
    })
    return counts
  }, [])

  return (
    <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
      {/* Search Bar - Fully Responsive */}
      <div className="w-full animate-[slideUp_0.5s_ease-out]">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by location..."
        />
      </div>

      {/* Filter Chips - Horizontal Scroll on Mobile */}
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

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredTargets.length === 0 ? (
        /* Empty State */
        <EmptyState
          title={searchQuery ? "No matching locations" : "No targets available"}
          message={
            searchQuery
              ? "Try a different search term or adjust filters"
              : "Check back later for monitoring data"
          }
        />
      ) : (
        /* Target Cards */
        <div className="space-y-3 md:space-y-4">
          {filteredTargets.map((target, index) => (
            <div
              key={target.id}
              className="animate-[slideUp_0.5s_ease-out]"
              style={{
                animationDelay: `${0.2 + index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              {expandedId === target.id ? (
                <TargetDetail
                  location={target.location}
                  dissolvedOxygen={target.dissolvedOxygen}
                  temperature={target.temperature}
                  warnings={target.warnings}
                  onClose={() => setExpandedId(null)}
                />
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

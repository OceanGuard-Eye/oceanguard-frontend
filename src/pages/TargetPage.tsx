import { useState } from "react"
import TargetCard from "../components/TargetCard"
import TargetDetail from "../components/TargetDetail"

type TargetLocation = {
  id: number
  location: string
  icon: "temperature" | "fish" | "trash"
  dissolvedOxygen: number
  temperature?: number
  warnings: number
}

// Mock data
const mockTargets: TargetLocation[] = [
  {
    id: 1,
    location: "123 Anywhere St., Any City, ST 12345",
    icon: "temperature",
    dissolvedOxygen: 3.2,
    temperature: 29,
    warnings: 3,
  },
  {
    id: 2,
    location: "123 Anywhere St., Any City, ST 12345",
    icon: "fish",
    dissolvedOxygen: 5.8,
    warnings: 1,
  },
  {
    id: 3,
    location: "123 Anywhere St., Any City, ST 12345",
    icon: "trash",
    dissolvedOxygen: 7.2,
    warnings: 0,
  },
]

export default function TargetPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {mockTargets.map((target) => (
        <div key={target.id}>
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
              onClick={() => setExpandedId(target.id)}
            />
          )}
        </div>
      ))}
    </div>
  )
}

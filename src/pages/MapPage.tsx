import { useState } from "react"

export default function MapPage() {
  const [isChlorophyllView, setIsChlorophyllView] = useState(false)

  const toggleView = () => {
    setIsChlorophyllView(!isChlorophyllView)
  }

  return (
    <div 
      className="relative w-full h-[50%] min-h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${isChlorophyllView ? '/1766302674455.jpg' : '/1766302674426.jpg'})` }}
    >
      {/* View Toggle Button */}
      <button
        onClick={toggleView}
        className="absolute top-20 right-4 z-20 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg font-medium text-gray-700 transition-colors"
      >
        {isChlorophyllView ? 'Normal View' : 'Chlorophyll View'}
      </button>

      {/* Chlorophyll Color Bar Legend - Only shows in Chlorophyll View */}
      {!isChlorophyllView && (
        <div className="absolute bottom-24 right-4 z-20 bg-white/90 p-4 rounded-lg shadow-lg">
          <div className="text-xs font-medium text-gray-700 mb-2 text-center">Chlorophyll Level</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium">0 μg/L</span>
            <img 
              src="/colorbar.png" 
              alt="Chlorophyll scale" 
              className="h-4 w-48 object-cover"
            />
            <span className="text-xs text-gray-600 font-medium">50 μg/L</span>
          </div>
        </div>
      )}

      {/* Time Slider */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/90 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-600 mt-1">27/02/2024</span>
            </div>
         
            
          </div>
        </div>
      </div>

      {/* Left Panel - Water Quality Data */}
      <div className="absolute left-4 top-32 w-96 bg-white/95 rounded-2xl shadow-xl p-6 z-10">
        <div className="space-y-4">
          {/* Temperature */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">Temperature</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">28.5 °C</span>
            </div>
          </div>

          {/* Chlorophyll */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">Chlorophyll</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">3.2 μg/L</span>
            </div>
          </div>

          {/* E. coli Bacteria */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">E. coli Bacteria</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">45 CFU/100mL</span>
            </div>
          </div>

          {/* Total Suspended Solid */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">Total Suspended Solid</span>
            <span className="text-gray-500 text-sm">18.7 mg/L</span>
          </div>

          {/* CDOM */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">CDOM</span>
            <span className="text-gray-500 text-sm">127 ppb</span>
          </div>

          {/* Turbidity */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">Turbidity</span>
            <span className="text-gray-500 text-sm">12.3 NTU</span>
          </div>

          {/* Sensor Info */}
          

          {/* Button */}
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2.5 rounded-lg font-medium">
            Summarize
          </button>

          {/* Address */}
          <div className="flex items-start gap-2 pt-2 text-sm text-gray-600">
            <span>📍</span>
            <div>
              <p>Chaophraya River</p>
              <p className="text-xs text-gray-500">(Southern)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Markers */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
        <img src="/mappin.png" alt="marker" className="w-8 h-8" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-12">
        <img src="/mappin.png" alt="marker" className="w-8 h-8" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform translate-x-4">
        <img src="/mappin.png" alt="marker" className="w-8 h-8" />
      </div>
      <div className="absolute top-2/3 left-1/2 transform translate-x-8">
        <img src="/mappin.png" alt="marker" className="w-8 h-8" />
      </div>
    </div>
  )
}

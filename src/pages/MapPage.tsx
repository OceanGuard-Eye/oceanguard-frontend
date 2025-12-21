export default function MapPage() {
  return (
    <div 
      className="relative w-full h-[50%] min-h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url(/1766302674426.jpg)' }}
    >
      {/* Time Slider */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/90 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600 mt-1">Now</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-xs text-gray-400 mt-1">+12h</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-400 mt-1">+24h</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-400 mt-1">+48h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left Panel - Water Quality Data */}
      <div className="absolute left-4 top-32 w-96 bg-white/95 rounded-2xl shadow-xl p-6 z-10">
        <div className="space-y-4">
          {/* NH3-N */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">NH3-N</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">## mg/L</span>
              <div className="flex gap-1">
                <span className="text-red-500">▲</span>
                <span className="text-red-500">▲</span>
                <span className="text-red-500">▲</span>
              </div>
            </div>
          </div>

          {/* NO2-, NO3- */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">NO2-, NO3-</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">## mg/L</span>
              <div className="flex gap-1">
                <span className="text-red-500">▲</span>
                <span className="text-red-500">▲</span>
                <span className="text-red-500">▲</span>
              </div>
            </div>
          </div>

          {/* PO4-P */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">PO4-P</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">## mg/L</span>
              <span className="text-xs text-gray-400">เสี่ยงน้ำเซียว ▲</span>
            </div>
          </div>

          {/* E. coli */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">E. coli</span>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">## CFU/100mL</span>
              <span className="text-green-500 text-xl">✓</span>
            </div>
          </div>

          {/* Heavy Metals */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">Heavy Metals</span>
            <span className="text-gray-500 text-sm">## mg/L</span>
          </div>

          {/* Flow rate */}
          <div className="flex items-center justify-between border-b pb-3">
            <span className="font-medium text-gray-700">Flow rate (Q)</span>
            <span className="text-gray-500 text-sm">## m³/day</span>
          </div>

          {/* Sensor Info */}
          <div className="text-xs text-gray-400 pt-2">
            <p>(แม่ปรางค์)</p>
            <p>ระบบเซ็นเซอร์เพื่อการตรวจติดตามคุณภาพน้ำ</p>
            <p>(น้อยขนาน0)</p>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2.5 rounded-lg font-medium">
            ปุ่มใดดสสสสสู
          </button>

          {/* Address */}
          <div className="flex items-start gap-2 pt-2 text-sm text-gray-600">
            <span>📍</span>
            <div>
              <p>123 Anywhere St., Any City, ST 12345</p>
              <p className="text-xs text-gray-500">(เอื้อนใต้)</p>
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

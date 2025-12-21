export default function SkeletonCard() {
  return (
    <div className="w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-4 flex items-center gap-4 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full" />
      
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      <div className="w-8 h-8 bg-gray-200 rounded-full" />
    </div>
  )
}

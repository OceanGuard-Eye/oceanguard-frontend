type BottomBarProps = {
  onLeftClick?: () => void
  onCenterClick?: () => void
  onRightClick?: () => void
}

export default function BottomBar({
  onLeftClick,
  onCenterClick,
  onRightClick,
}: BottomBarProps) {
  return (
    <nav className="w-full bg-white border-t border-gray-200">
      <div className="relative h-16 w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              relative
              h-12
              w-[220px] sm:w-[240px]
              rounded-2xl
              bg-white
              flex items-center justify-between
              px-6
            "
          >
            <button
              type="button"
              onClick={onLeftClick}
              aria-label="Map"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 flex items-center justify-center"
            >
              <img
                src="/map.png"
                alt="map"
                className="h-8 w-8 max-h-full max-w-full object-contain"
                draggable={false}
              />
            </button>

            <div className="w-10" aria-hidden="true" />

            <button
              type="button"
              onClick={onRightClick}
              aria-label="Notifications"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 flex items-center justify-center"
            >
              <img
                src="/notification.png"
                alt="notification"
                className="h-8 w-8 max-h-full max-w-full object-contain"
                draggable={false}
              />
            </button>

            <button
              type="button"
              onClick={onCenterClick}
              aria-label="Target"
              className="
                absolute left-1/2 top-0
                -translate-x-1/2 -translate-y-1/3
                h-14 w-14
                rounded-full
                bg-small-blue hover:bg-sky-600
                border border-sky-200
                flex items-center justify-center
              "
            >
              <img
                src="/target.png"
                alt="target"
                className="h-10 w-10 max-h-full max-w-full object-contain"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

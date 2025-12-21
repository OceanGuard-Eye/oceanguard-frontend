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
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex items-center justify-center shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
              </svg>
              <span className="sr-only">Map</span>
            </button>

            <div className="w-10" aria-hidden="true" />

            <button
              type="button"
              onClick={onRightClick}
              aria-label="Notifications"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex items-center justify-center shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />
              </svg>
              <span className="sr-only">Notifications</span>
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
                text-white
                transition-all
                shadow-lg hover:shadow-xl
              "
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
              </svg>
              <span className="sr-only">Target</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

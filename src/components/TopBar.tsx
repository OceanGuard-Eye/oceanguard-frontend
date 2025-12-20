type TopBarProps = {
  title?: string
  logoSrc?: string
}

export default function TopBar({ title = "OceanGuard Eye", logoSrc }: TopBarProps) {
  return (
    <header className="w-full bg-mid-blue shadow-sm">
      <div className="h-12 w-full flex items-center">
        <div className="w-full flex items-center gap-2 px-[4vw] sm:px-6 lg:px-8">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="logo"
              className="h-7 w-7 object-contain"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-white/90 flex items-center justify-center shrink-0">
              <div className="h-4 w-4 rounded-full bg-sky-600" />
            </div>
          )}

          <span className="text-white font-semibold tracking-wide">
            {title}
          </span>
        </div>
      </div>
    </header>
  )
}

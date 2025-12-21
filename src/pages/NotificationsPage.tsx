import NotiBox from "../components/NotiBox"
import NotiCard from "../components/NotiCard"

const textNode = (
  <span className="flex items-center gap-2 min-w-0">
    {/* ให้รูป fit ตามความสูงของ container (ไม่หด) */}
    <span className="h-6 shrink-0">
      <img
        src="/mappin.png"
        alt="map pin"
        className="h-full w-auto"
        draggable={false}
      />
    </span>

    <span className="truncate">123 Anywhere St., Any City, ST 12345</span>
  </span>
)

const rightIcon = (
  <img
    src="/logo_blue.png"
    alt="logo"
    className="h-9 w-9"
    draggable={false}
  />
)


export default function NotificationsPage() {
  return (
    <div className="w-full flex flex-col items-center space-y-4 py-4">
      <NotiBox text={textNode} icon={rightIcon} card={<NotiCard leftImage="/logo_white.png" rightImage="/logo_white.png" />} />
      <NotiBox text={textNode} icon={rightIcon} card={<NotiCard leftImage="/logo_white.png" rightImage="/logo_white.png" />} />
      <NotiBox text={textNode} icon={rightIcon} card={<NotiCard leftImage="/logo_white.png" rightImage="/logo_white.png" />} />
    </div>
  )
}

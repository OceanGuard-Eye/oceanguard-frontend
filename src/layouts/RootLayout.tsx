import { Outlet, useNavigate } from "react-router-dom"
import TopBar from "../components/TopBar"
import BottomBar from "../components/BottomBar"

export default function RootLayout() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col">
      <TopBar title="OceanGuard Eye"  logoSrc="/logo_white.png" />

      <main className="flex-1 w-full">
        <div className="w-full px-[4vw] sm:px-6 lg:px-8 py-4">
          <Outlet />
        </div>
      </main>

      <BottomBar
        onLeftClick={() => navigate("/map")}
        onCenterClick={() => navigate("/target")}
        onRightClick={() => navigate("/notifications")}
      />
    </div>
  )
}

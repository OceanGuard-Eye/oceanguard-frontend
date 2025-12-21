import { Outlet, useNavigate, useLocation } from "react-router-dom"
import TopBar from "../components/TopBar"
import BottomBar from "../components/BottomBar"

export default function RootLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isTargetPage = location.pathname === "/target"

  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col">
      <TopBar title="OceanGuard Eye"  logoSrc="/logo_white.png" />

      <main className={isTargetPage ? "flex-1 w-full" : "flex-1 w-full"}>
        <div className={isTargetPage ? "w-full h-full" : "w-full px-[4vw] sm:px-6 lg:px-8 py-4"}>
          <Outlet />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomBar
          onLeftClick={() => navigate("/map")}
          onCenterClick={() => navigate("/target")}
          onRightClick={() => navigate("/notifications")}
        />
      </div>
    </div>
  )
}

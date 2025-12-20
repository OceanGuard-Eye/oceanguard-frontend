import { createBrowserRouter, Navigate } from "react-router-dom"
import RootLayout from "../layouts/RootLayout"
import MapPage from "../pages/MapPage"
import TargetPage from "../pages/TargetPage"
import NotificationsPage from "../pages/NotificationsPage"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // default route
      { path: "/", element: <Navigate to="/map" replace /> },

      { path: "/map", element: <MapPage /> },
      { path: "/target", element: <TargetPage /> },
      { path: "/notifications", element: <NotificationsPage /> },
    ],
  },
])

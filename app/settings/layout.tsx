import type React from "react"
import DashboardNav from "@/components/dashboard/dashboard-nav"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />
      <div className="flex-1 pt-16">{children}</div>
    </div>
  )
}

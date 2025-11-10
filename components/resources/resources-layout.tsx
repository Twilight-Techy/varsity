import type React from "react"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import ResourcesSidebar from "@/components/resources/resources-sidebar"

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav />
      <div className="pt-16 lg:container mx-auto">
        <div className="flex flex-col md:flex-row">
          <ResourcesSidebar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

import type React from "react"
import type { Metadata } from "next"
import DashboardNav from "@/components/dashboard/dashboard-nav"

export const metadata: Metadata = {
  title: "Courses | Varsity",
  description: "Browse and manage your courses on Varsity",
}

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />
      <main className="flex-1 pt-16">{children}</main>
    </div>
  )
}

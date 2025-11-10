import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Class Schedule - Varsity",
  description: "Manage your classes, labs, and academic events",
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

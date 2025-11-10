import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Study Groups - Varsity",
  description: "Join and create study groups with your classmates",
}

export default function StudyGroupsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

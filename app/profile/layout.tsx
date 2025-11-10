import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile - Varsity",
  description: "View and manage your Varsity profile",
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

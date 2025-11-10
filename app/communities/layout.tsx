import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Communities - Varsity",
  description: "Connect with your university communities",
}

export default function CommunitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

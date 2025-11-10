import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources Hub | Varsity",
  description: "Access study materials, textbooks, past questions and more",
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Assistant - Varsity",
  description: "Get help with your studies from our AI assistant",
}

export default function AIAssistantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

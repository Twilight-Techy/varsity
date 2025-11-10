"use client"

import { useState } from "react"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import ConversationSidebar from "@/components/ai-assistant/conversation-sidebar"
import ChatInterface from "@/components/ai-assistant/chat-interface"
import { PanelLeftIcon, PanelLeftCloseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AIAssistantLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />
      <div className="flex flex-1 pt-16">
        {/* Mobile sidebar toggle */}
        <div className="fixed bottom-4 left-4 z-20 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg border-foreground/10 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelLeftCloseIcon className="h-5 w-5" /> : <PanelLeftIcon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-10 w-80 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-80 md:flex-shrink-0 pt-16 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ConversationSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}

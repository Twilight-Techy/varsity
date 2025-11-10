"use client"

import { useState } from "react"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import ScheduleSidebar from "@/components/schedule/schedule-sidebar"
import ScheduleCalendar from "@/components/schedule/schedule-calendar"
import { PanelLeftIcon, PanelLeftCloseIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddClassModal from "@/components/schedule/add-class-modal"

export default function ScheduleLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false)

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
          className={`fixed inset-y-0 left-0 z-10 w-72 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-72 md:flex-shrink-0 pt-16 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ScheduleSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Class Schedule</h1>
              <p className="text-foreground/70">Manage your classes, labs, and academic events</p>
            </div>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => setIsAddClassModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Class
            </Button>
          </div>

          <ScheduleCalendar />
        </div>
      </div>

      <AddClassModal open={isAddClassModalOpen} onOpenChange={setIsAddClassModalOpen} />
    </div>
  )
}

"use client"

import { useState } from "react"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import CommunitySidebar from "@/components/communities/community-sidebar"
import CommunityGrid from "@/components/communities/community-grid"
import { PanelLeftIcon, PanelLeftCloseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function CommunitiesLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

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
          <CommunitySidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4 md:p-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Communities</h1>
                <p className="text-foreground/70">Connect with your university communities</p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <Input
                  placeholder="Search communities..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="my-communities" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="my-communities">My Communities</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="suggested">Suggested</TabsTrigger>
              </TabsList>
              <TabsContent value="my-communities">
                <CommunityGrid filter="my" searchQuery={searchQuery} />
              </TabsContent>
              <TabsContent value="discover">
                <CommunityGrid filter="all" searchQuery={searchQuery} />
              </TabsContent>
              <TabsContent value="suggested">
                <CommunityGrid filter="suggested" searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

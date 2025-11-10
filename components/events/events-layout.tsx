"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import EventsGrid from "@/components/events/events-grid"
import EventsSidebar from "@/components/events/events-sidebar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import type { Event } from "@/lib/data/events"

interface EventsLayoutProps {
  events: Event[]
  registeredEventIds: string[]
}

export default function EventsLayout({ events, registeredEventIds }: EventsLayoutProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category") || null)
  const [selectedTab, setSelectedTab] = useState<string>(searchParams.get("tab") || "all")
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events)

  // Apply filters whenever dependencies change
  useEffect(() => {
    let filtered = [...events]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((event) => event.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Filter by tab
    if (selectedTab === "registered") {
      filtered = filtered.filter((event) => registeredEventIds.includes(event.id))
    } else if (selectedTab === "virtual") {
      filtered = filtered.filter((event) => event.isVirtual)
    } else if (selectedTab === "in-person") {
      filtered = filtered.filter((event) => !event.isVirtual)
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, selectedCategory, selectedTab, registeredEventIds])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedCategory) {
      params.set("category", selectedCategory)
    }

    if (selectedTab !== "all") {
      params.set("tab", selectedTab)
    }

    const newUrl = `/events${params.toString() ? `?${params.toString()}` : ""}`
    router.push(newUrl, { scroll: false })
  }, [selectedCategory, selectedTab, router])

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <div className="container mx-auto px-4 py-6 pt-20">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64 flex-shrink-0">
            <EventsSidebar selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Events</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="registered">Registered</TabsTrigger>
                <TabsTrigger value="virtual">Virtual</TabsTrigger>
                <TabsTrigger value="in-person">In Person</TabsTrigger>
              </TabsList>
            </Tabs>

            <EventsGrid events={filteredEvents} registeredEventIds={registeredEventIds} />
          </main>
        </div>
      </div>
    </div>
  )
}

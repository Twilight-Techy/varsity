"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  CalendarDays,
  Clock,
  Compass,
  GraduationCap,
  Heart,
  MapPin,
  Megaphone,
  Music,
  PartyPopper,
  Plus,
  Presentation,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EventsSidebarProps {
  onCategorySelect?: (category: string) => void
  onTypeSelect?: (type: string) => void
  onDateSelect?: (date: string) => void
  onLocationSelect?: (location: string) => void
}

export default function EventsSidebar({
  onCategorySelect,
  onTypeSelect,
  onDateSelect,
  onLocationSelect,
}: EventsSidebarProps) {
  const pathname = usePathname()

  const categories = [
    { name: "All Categories", value: "all", icon: Compass, href: "/events" },
    { name: "Academic", value: "academic", icon: GraduationCap, href: "/events?category=academic" },
    { name: "Social", value: "social", icon: PartyPopper, href: "/events?category=social" },
    { name: "Career", value: "career", icon: Presentation, href: "/events?category=career" },
    { name: "Workshops", value: "workshop", icon: Users, href: "/events?category=workshops" },
    { name: "Conferences", value: "conference", icon: Megaphone, href: "/events?category=conferences" },
    { name: "Arts & Culture", value: "arts", icon: Music, href: "/events?category=arts" },
  ]

  const eventTypes = [
    { name: "All Types", value: "all", icon: Compass },
    { name: "On Campus", value: "on-campus", icon: MapPin },
    { name: "Off Campus", value: "off-campus", icon: MapPin },
    { name: "Virtual", value: "virtual", icon: Compass },
    { name: "Hybrid", value: "hybrid", icon: Compass },
  ]

  const dateFilters = [
    { name: "All Events", value: "all", icon: Compass },
    { name: "Happening Today", value: "today", icon: Clock },
    { name: "Tomorrow", value: "tomorrow", icon: Calendar },
    { name: "This Week", value: "this-week", icon: Calendar },
    { name: "This Month", value: "this-month", icon: Calendar },
    { name: "Upcoming", value: "upcoming", icon: Calendar },
    { name: "Past Events", value: "past", icon: Calendar },
  ]

  const upcomingEvents = [
    {
      id: "1",
      name: "Spring Career Fair",
      date: "Apr 28, 2023",
      href: "/events/1",
    },
    {
      id: "2",
      name: "AI Workshop Series",
      date: "May 5, 2023",
      href: "/events/2",
    },
    {
      id: "3",
      name: "End of Year Celebration",
      date: "May 15, 2023",
      href: "/events/3",
    },
  ]

  const handleCategoryClick = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category)
    }
  }

  const handleTypeClick = (type: string) => {
    if (onTypeSelect) {
      onTypeSelect(type)
    }
  }

  const handleDateClick = (date: string) => {
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  const handleLocationClick = (location: string) => {
    if (onLocationSelect) {
      onLocationSelect(location)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Discover</h3>
        <div className="space-y-1">
          {dateFilters.map((filter) => (
            <Button
              key={filter.value}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleDateClick(filter.value)}
            >
              <filter.icon className="h-4 w-4 mr-2" />
              {filter.name}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link href="/events?filter=saved">
              <Heart className="h-4 w-4 mr-2" />
              Saved Events
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleCategoryClick(category.value)}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Location</h3>
        <div className="space-y-1">
          {eventTypes.map((type) => (
            <Button
              key={type.name}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleLocationClick(type.value)}
            >
              <type.icon className="h-4 w-4 mr-2" />
              {type.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Upcoming Events</h3>
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add event</span>
          </Button>
        </div>
        <ScrollArea className="h-[180px]">
          <div className="space-y-1">
            {upcomingEvents.map((event) => (
              <Button
                key={event.id}
                variant="ghost"
                size="sm"
                className={cn("w-full justify-start font-normal", pathname === event.href && "bg-accent")}
                asChild
              >
                <Link href={event.href}>
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="flex flex-col items-start">
                    <span className="line-clamp-1">{event.name}</span>
                    <span className="text-xs text-muted-foreground">{event.date}</span>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      <Button className="w-full" asChild>
        <Link href="/events/create">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Link>
      </Button>
    </div>
  )
}

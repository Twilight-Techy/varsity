"use client"

import { Button } from "@/components/ui/button"
import EventCard from "@/components/events/event-card"
import { Calendar } from "lucide-react"
import type { Event } from "@/lib/data/events"

interface EventsGridProps {
  events: Event[]
  registeredEventIds: string[]
}

export default function EventsGrid({ events, registeredEventIds }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          We couldn't find any events matching your criteria. Try adjusting your filters or check back later.
        </p>
        <Button variant="outline" onClick={() => (window.location.href = "/events")}>
          Reset Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} isRegistered={registeredEventIds.includes(event.id)} />
      ))}
    </div>
  )
}

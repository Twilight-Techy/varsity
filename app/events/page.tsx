import { Suspense } from "react"
import type { Metadata } from "next"
import EventsLayout from "@/components/events/events-layout"
import { getAllEvents } from "@/lib/data/events"
import { getUserRegistrations } from "@/lib/actions/event-actions"

export const metadata: Metadata = {
  title: "Events | Varsity",
  description: "Discover and join campus events, workshops, seminars, and more.",
}

export default async function EventsPage() {
  const events = getAllEvents()
  const registeredEvents = await getUserRegistrations()
  const registeredEventIds = registeredEvents.map((event) => event.id)

  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <EventsLayout events={events} registeredEventIds={registeredEventIds} />
    </Suspense>
  )
}

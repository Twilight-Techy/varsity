import { notFound } from "next/navigation"
import EventDetail from "@/components/events/event-detail"
import { getEventById } from "@/lib/data/events"

export const metadata = {
  title: "Event Details | Varsity",
  description: "View event details and register for campus events.",
}

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEventById(params.id)

  if (!event) {
    notFound()
  }

  return <EventDetail event={event} />
}

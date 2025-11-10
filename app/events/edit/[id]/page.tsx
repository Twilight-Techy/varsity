import { notFound } from "next/navigation"
import { getEventById } from "@/lib/data/events"
import EditEventForm from "@/components/events/edit-event-form"

export const metadata = {
  title: "Edit Event | Varsity",
  description: "Edit your event details and settings.",
}

interface EditEventPageProps {
  params: {
    id: string
  }
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const event = getEventById(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
        <p className="text-muted-foreground mt-2">Update your event details and settings.</p>
      </div>
      <EditEventForm event={event} />
    </div>
  )
}

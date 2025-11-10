import CreateEventForm from "@/components/events/create-event-form"

export const metadata = {
  title: "Create Event | Varsity",
  description: "Create a new campus event, workshop, seminar, or other academic activity.",
}

export default function CreateEventPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
        <p className="text-muted-foreground mt-2">Share your event with the campus community.</p>
      </div>
      <CreateEventForm />
    </div>
  )
}

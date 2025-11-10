import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarPlus, Loader2 } from "lucide-react"
import { getCurrentUserEvents } from "@/lib/actions/event-actions"
import MyEventsTable from "@/components/events/my-events-table"
import { getUserRegistrations } from "@/lib/actions/event-actions"

export const metadata = {
  title: "My Events | Varsity",
  description: "Manage your created events and event registrations.",
}

export default async function MyEventsPage() {
  const createdEvents = await getCurrentUserEvents()
  const registeredEvents = await getUserRegistrations()

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
          <p className="text-muted-foreground mt-1">Manage your events and registrations</p>
        </div>
        <Button asChild>
          <Link href="/events/create">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Create New Event
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="created" className="space-y-6">
        <TabsList>
          <TabsTrigger value="created">Created Events</TabsTrigger>
          <TabsTrigger value="registered">Registered Events</TabsTrigger>
        </TabsList>

        <TabsContent value="created">
          <Suspense fallback={<EventsLoading />}>
            {createdEvents.length > 0 ? (
              <MyEventsTable events={createdEvents} type="created" />
            ) : (
              <EmptyState
                title="No events created yet"
                description="Create your first event to see it here."
                buttonText="Create Event"
                buttonHref="/events/create"
              />
            )}
          </Suspense>
        </TabsContent>

        <TabsContent value="registered">
          <Suspense fallback={<EventsLoading />}>
            {registeredEvents.length > 0 ? (
              <MyEventsTable events={registeredEvents} type="registered" />
            ) : (
              <EmptyState
                title="No event registrations"
                description="Register for events to see them here."
                buttonText="Browse Events"
                buttonHref="/events"
              />
            )}
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EventsLoading() {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}

function EmptyState({
  title,
  description,
  buttonText,
  buttonHref,
}: {
  title: string
  description: string
  buttonText: string
  buttonHref: string
}) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button asChild>
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

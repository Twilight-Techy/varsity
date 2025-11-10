import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, CheckCircle2 } from "lucide-react"
import type { Event } from "@/lib/data/events"

interface EventCardProps {
  event: Event
  isRegistered?: boolean
}

export default function EventCard({ event, isRegistered = false }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group">
      <div className="rounded-lg border bg-card overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video">
          <Image
            src={event.image || `/placeholder.svg?height=200&width=400&text=${event.title}`}
            alt={event.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {isRegistered && (
            <div className="absolute top-2 right-2">
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Registered
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{event.category}</Badge>
            <Badge variant={event.isVirtual ? "outline" : "default"} className="bg-blue-600 hover:bg-blue-700">
              {event.isVirtual ? "Virtual" : "In Person"}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600">{event.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{event.description}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Calendar, Clock, MoreHorizontal, Pencil, Trash2, Users, ExternalLink, Ban } from "lucide-react"
import type { Event } from "@/lib/data/events"
import { deleteEvent, cancelRegistration } from "@/lib/actions/event-actions"
import { useToast } from "@/hooks/use-toast"

interface MyEventsTableProps {
  events: Event[]
  type: "created" | "registered"
}

export default function MyEventsTable({ events, type }: MyEventsTableProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<"delete" | "cancel">("delete")

  const handleEdit = (eventId: string) => {
    router.push(`/events/edit/${eventId}`)
  }

  const handleDelete = async () => {
    if (!selectedEventId) return

    setIsDeleting(true)

    try {
      const result = await deleteEvent(selectedEventId)

      if (result.success) {
        toast({
          title: "Event Deleted",
          description: "The event has been deleted successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete event. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsConfirmOpen(false)
      setSelectedEventId(null)
    }
  }

  const handleCancelRegistration = async () => {
    if (!selectedEventId) return

    setIsDeleting(true)

    try {
      const result = await cancelRegistration(selectedEventId)

      if (result.success) {
        toast({
          title: "Registration Canceled",
          description: "Your registration has been canceled successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to cancel registration. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error canceling registration:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsConfirmOpen(false)
      setSelectedEventId(null)
    }
  }

  const confirmDelete = (eventId: string) => {
    setSelectedEventId(eventId)
    setConfirmAction("delete")
    setIsConfirmOpen(true)
  }

  const confirmCancel = (eventId: string) => {
    setSelectedEventId(eventId)
    setConfirmAction("cancel")
    setIsConfirmOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  <div>
                    <Link href={`/events/${event.id}`} className="hover:underline font-medium">
                      {event.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{event.category}</Badge>
                      {event.isVirtual && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Virtual
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{event.isVirtual ? "Virtual Event" : event.location}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.attendees}</span>
                    {event.capacity && <span className="text-muted-foreground ml-1">/{event.capacity}</span>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/events/${event.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Event
                        </Link>
                      </DropdownMenuItem>

                      {type === "created" ? (
                        <>
                          <DropdownMenuItem onClick={() => handleEdit(event.id)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmDelete(event.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Event
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => confirmCancel(event.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Cancel Registration
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmAction === "delete" ? "Delete Event" : "Cancel Registration"}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === "delete"
                ? "Are you sure you want to delete this event? This action cannot be undone."
                : "Are you sure you want to cancel your registration for this event?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction === "delete" ? handleDelete : handleCancelRegistration}
              className={confirmAction === "delete" ? "bg-red-600 hover:bg-red-700" : ""}
              disabled={isDeleting}
            >
              {isDeleting ? "Processing..." : confirmAction === "delete" ? "Delete" : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

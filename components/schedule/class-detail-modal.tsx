"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, BookOpen, Bell, BellOff, Edit, Trash2 } from "lucide-react"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ClassDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event: {
    id: string
    title: string
    type: string
    startTime: string
    endTime: string
    location?: string
    instructor?: string
    course?: string
    description?: string
    recurring?: boolean
    recurrencePattern?: string
  } | null
}

export default function ClassDetailModal({ open, onOpenChange, event }: ClassDetailModalProps) {
  const [remindersEnabled, setRemindersEnabled] = useState(true)

  if (!event) return null

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
      case "lab":
        return "bg-purple-600/10 text-purple-500 border-purple-500/20"
      case "tutorial":
        return "bg-green-600/10 text-green-500 border-green-500/20"
      case "exam":
        return "bg-red-600/10 text-red-500 border-red-500/20"
      case "meeting":
        return "bg-yellow-600/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{event.title}</DialogTitle>
            <Badge variant="outline" className={cn("capitalize", getEventTypeColor(event.type))}>
              {event.type}
            </Badge>
          </div>
          <DialogDescription>{event.course && <span className="font-medium">{event.course}</span>}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Date & Time</h4>
              <p className="text-sm text-foreground/70">{format(parseISO(event.startTime), "EEEE, MMMM d, yyyy")}</p>
              <p className="text-sm text-foreground/70">
                {format(parseISO(event.startTime), "h:mm a")} - {format(parseISO(event.endTime), "h:mm a")}
              </p>
              {event.recurring && (
                <p className="text-sm text-foreground/70 mt-1">Repeats {event.recurrencePattern || "weekly"}</p>
              )}
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-sm text-foreground/70">{event.location}</p>
              </div>
            </div>
          )}

          {event.instructor && (
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Instructor</h4>
                <p className="text-sm text-foreground/70">{event.instructor}</p>
              </div>
            </div>
          )}

          {event.description && (
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-foreground/70">{event.description}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {remindersEnabled ? (
                <Bell className="h-4 w-4 text-foreground/70" />
              ) : (
                <BellOff className="h-4 w-4 text-foreground/70" />
              )}
              <Label htmlFor="reminder-toggle" className="text-sm cursor-pointer">
                Reminders
              </Label>
            </div>
            <Switch id="reminder-toggle" checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-9 w-9 text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

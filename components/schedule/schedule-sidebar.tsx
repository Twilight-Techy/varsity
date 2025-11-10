"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Calendar, Clock, Bell, BookOpen, Beaker, Users, Presentation, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { scheduleEvents } from "@/lib/data/schedule-events"
import { format, isToday, isTomorrow, addDays, isAfter, isBefore, startOfDay } from "date-fns"

interface ScheduleSidebarProps {
  onClose: () => void
}

export default function ScheduleSidebar({ onClose }: ScheduleSidebarProps) {
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [syncWithCommunities, setSyncWithCommunities] = useState(true)

  // Get today's and upcoming events
  const today = startOfDay(new Date())
  const tomorrow = addDays(today, 1)
  const nextWeek = addDays(today, 7)

  const todayEvents = scheduleEvents.filter((event) => isToday(new Date(event.startTime)))
  const tomorrowEvents = scheduleEvents.filter((event) => isTomorrow(new Date(event.startTime)))
  const upcomingEvents = scheduleEvents.filter(
    (event) =>
      isAfter(new Date(event.startTime), tomorrow) &&
      isBefore(new Date(event.startTime), nextWeek) &&
      !isToday(new Date(event.startTime)) &&
      !isTomorrow(new Date(event.startTime)),
  )

  const getEventIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <Presentation className="h-4 w-4 text-blue-500" />
      case "lab":
        return <Beaker className="h-4 w-4 text-purple-500" />
      case "tutorial":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "exam":
        return <GraduationCap className="h-4 w-4 text-red-500" />
      case "meeting":
        return <Users className="h-4 w-4 text-yellow-500" />
      default:
        return <Calendar className="h-4 w-4 text-blue-500" />
    }
  }

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
    <div className="h-full bg-background border-r border-foreground/10 flex flex-col">
      <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Schedule</h2>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Today's events */}
              <div>
                <h3 className="font-medium text-sm mb-3 text-foreground/70">Today</h3>
                {todayEvents.length > 0 ? (
                  <div className="space-y-2">
                    {todayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-foreground/10 hover:border-foreground/20 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {getEventIcon(event.type)}
                            <h4 className="font-medium text-sm">{event.title}</h4>
                          </div>
                          <Badge variant="outline" className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
                          </span>
                        </div>
                        {event.location && <div className="text-xs text-foreground/70">{event.location}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-foreground/70 text-center py-3">No events today</div>
                )}
              </div>

              {/* Tomorrow's events */}
              <div>
                <h3 className="font-medium text-sm mb-3 text-foreground/70">Tomorrow</h3>
                {tomorrowEvents.length > 0 ? (
                  <div className="space-y-2">
                    {tomorrowEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-foreground/10 hover:border-foreground/20 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {getEventIcon(event.type)}
                            <h4 className="font-medium text-sm">{event.title}</h4>
                          </div>
                          <Badge variant="outline" className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
                          </span>
                        </div>
                        {event.location && <div className="text-xs text-foreground/70">{event.location}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-foreground/70 text-center py-3">No events tomorrow</div>
                )}
              </div>

              {/* Upcoming events */}
              <div>
                <h3 className="font-medium text-sm mb-3 text-foreground/70">Upcoming</h3>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg bg-gradient-to-r from-background/80 to-background/40 border border-foreground/10 hover:border-foreground/20 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {getEventIcon(event.type)}
                            <h4 className="font-medium text-sm">{event.title}</h4>
                          </div>
                          <Badge variant="outline" className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(event.startTime), "EEE, MMM d")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-foreground/70 mb-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
                          </span>
                        </div>
                        {event.location && <div className="text-xs text-foreground/70">{event.location}</div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-foreground/70 text-center py-3">No upcoming events</div>
                )}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="filters" className="flex-1">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-medium text-sm mb-3 text-foreground/70">Event Types</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="filter-lectures" defaultChecked />
                  <Label htmlFor="filter-lectures" className="flex items-center gap-2">
                    <Presentation className="h-4 w-4 text-blue-500" />
                    <span>Lectures</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="filter-labs" defaultChecked />
                  <Label htmlFor="filter-labs" className="flex items-center gap-2">
                    <Beaker className="h-4 w-4 text-purple-500" />
                    <span>Labs</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="filter-tutorials" defaultChecked />
                  <Label htmlFor="filter-tutorials" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <span>Tutorials</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="filter-exams" defaultChecked />
                  <Label htmlFor="filter-exams" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-red-500" />
                    <span>Exams</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="filter-meetings" defaultChecked />
                  <Label htmlFor="filter-meetings" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-yellow-500" />
                    <span>Meetings</span>
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-3 text-foreground/70">Courses</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="filter-cs301" defaultChecked />
                  <Label htmlFor="filter-cs301">CS 301: Data Structures</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="filter-cs305" defaultChecked />
                  <Label htmlFor="filter-cs305">CS 305: Database Systems</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="filter-cs310" defaultChecked />
                  <Label htmlFor="filter-cs310">CS 310: Computer Networks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="filter-mth301" defaultChecked />
                  <Label htmlFor="filter-mth301">MTH 301: Linear Algebra</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t border-foreground/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-foreground/70" />
            <span className="text-sm">Reminders</span>
          </div>
          <Switch checked={remindersEnabled} onCheckedChange={setRemindersEnabled} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-foreground/70" />
            <span className="text-sm">Sync with Communities</span>
          </div>
          <Switch checked={syncWithCommunities} onCheckedChange={setSyncWithCommunities} />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Clock,
  MapPin,
  User,
  Presentation,
  Beaker,
  BookOpen,
  GraduationCap,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { scheduleEvents } from "@/lib/data/schedule-events"
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  isToday,
  parseISO,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns"

export default function ScheduleCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")

  const handlePrevious = () => {
    if (view === "day") {
      setDate(subDays(date, 1))
    } else if (view === "week") {
      setDate(subWeeks(date, 1))
    } else {
      setDate(subMonths(date, 1))
    }
  }

  const handleNext = () => {
    if (view === "day") {
      setDate(addDays(date, 1))
    } else if (view === "week") {
      setDate(addWeeks(date, 1))
    } else {
      setDate(addMonths(date, 1))
    }
  }

  const handleToday = () => {
    setDate(new Date())
  }

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
        return <CalendarIcon className="h-4 w-4 text-blue-500" />
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

  const getEventBgColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-500/10 hover:bg-blue-500/20"
      case "lab":
        return "bg-purple-500/10 hover:bg-purple-500/20"
      case "tutorial":
        return "bg-green-500/10 hover:bg-green-500/20"
      case "exam":
        return "bg-red-500/10 hover:bg-red-500/20"
      case "meeting":
        return "bg-yellow-500/10 hover:bg-yellow-500/20"
      default:
        return "bg-blue-500/10 hover:bg-blue-500/20"
    }
  }

  const renderDayView = () => {
    const dayEvents = scheduleEvents.filter((event) => isSameDay(parseISO(event.startTime), date))
    const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8am to 9pm

    return (
      <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-foreground/10">
          <h2 className="text-lg font-semibold">{format(date, "EEEE, MMMM d, yyyy")}</h2>
        </div>
        <div className="p-4">
          {hours.map((hour) => {
            const hourEvents = dayEvents.filter((event) => {
              const eventHour = parseISO(event.startTime).getHours()
              return eventHour === hour
            })

            return (
              <div key={hour} className="flex mb-4">
                <div className="w-16 text-sm text-foreground/70 pt-2">
                  {hour === 12 ? "12 PM" : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                </div>
                <div className="flex-1 min-h-[60px] border-t border-foreground/10 pt-2">
                  {hourEvents.length > 0 ? (
                    <div className="space-y-2">
                      {hourEvents.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn("p-2 rounded-lg cursor-pointer transition-colors", getEventBgColor(event.type))}
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
                          <div className="flex items-center gap-2 text-xs text-foreground/70">
                            <Clock className="h-3 w-3" />
                            <span>
                              {format(parseISO(event.startTime), "h:mm a")} -{" "}
                              {format(parseISO(event.endTime), "h:mm a")}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-xs text-foreground/70 mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.instructor && (
                            <div className="flex items-center gap-2 text-xs text-foreground/70 mt-1">
                              <User className="h-3 w-3" />
                              <span>{event.instructor}</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(date, { weekStartsOn: 0 })
    const weekEnd = endOfWeek(date, { weekStartsOn: 0 })
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
    const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8am to 9pm

    return (
      <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg">
        <div className="grid grid-cols-8 border-b border-foreground/10">
          <div className="p-4 border-r border-foreground/10">
            <span className="sr-only">Time</span>
          </div>
          {days.map((day) => (
            <div
              key={day.toString()}
              className={cn(
                "p-4 text-center",
                isToday(day) && "bg-blue-500/10",
                day.getDay() !== days.length - 1 && "border-r border-foreground/10",
              )}
            >
              <div className="font-medium">{format(day, "EEE")}</div>
              <div className={cn("text-sm", isToday(day) ? "text-blue-500 font-semibold" : "text-foreground/70")}>
                {format(day, "MMM d")}
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-auto max-h-[calc(100vh-300px)]">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 min-h-[80px]">
              <div className="p-2 text-xs text-foreground/70 border-r border-foreground/10 flex items-start justify-center pt-3">
                {hour === 12 ? "12 PM" : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
              </div>

              {days.map((day, dayIndex) => {
                const dayEvents = scheduleEvents.filter((event) => {
                  const eventDate = parseISO(event.startTime)
                  return isSameDay(eventDate, day) && eventDate.getHours() === hour
                })

                return (
                  <div
                    key={day.toString()}
                    className={cn(
                      "p-1 border-t border-foreground/10",
                      isToday(day) && "bg-blue-500/5",
                      dayIndex !== days.length - 1 && "border-r border-foreground/10",
                    )}
                  >
                    {dayEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "p-1 rounded text-xs cursor-pointer mb-1 transition-colors",
                          getEventBgColor(event.type),
                        )}
                      >
                        <div className="flex items-center gap-1 mb-0.5">
                          {getEventIcon(event.type)}
                          <span className="font-medium truncate">{event.title}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-foreground/70">
                          <Clock className="h-2 w-2" />
                          <span>
                            {format(parseISO(event.startTime), "h:mm")} - {format(parseISO(event.endTime), "h:mm")}
                          </span>
                        </div>
                        {event.location && (
                          <div className="text-[10px] text-foreground/70 truncate">{event.location}</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMonthView = () => {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-foreground/10">
          <h2 className="text-lg font-semibold">{format(date, "MMMM yyyy")}</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium p-2">
                {day}
              </div>
            ))}
            {days.map((day) => {
              const dayEvents = scheduleEvents.filter((event) => isSameDay(parseISO(event.startTime), day))
              const isCurrentMonth = isSameMonth(day, date)

              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "min-h-[100px] p-1 border border-foreground/10 rounded-lg",
                    !isCurrentMonth && "opacity-40",
                    isToday(day) && "bg-blue-500/10 border-blue-500/30",
                  )}
                >
                  <div className={cn("text-right text-sm p-1", isToday(day) && "font-bold text-blue-500")}>
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className={cn("text-xs p-1 rounded truncate", getEventBgColor(event.type))}>
                        <div className="flex items-center gap-1">
                          {getEventIcon(event.type)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-foreground/70 text-center">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <h2 className="text-lg font-semibold ml-2">
            {view === "day"
              ? format(date, "MMMM d, yyyy")
              : view === "week"
                ? `${format(startOfWeek(date, { weekStartsOn: 0 }), "MMM d")} - ${format(
                    endOfWeek(date, { weekStartsOn: 0 }),
                    "MMM d, yyyy",
                  )}`
                : format(date, "MMMM yyyy")}
          </h2>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        {view === "day" && renderDayView()}
        {view === "week" && renderWeekView()}
        {view === "month" && renderMonthView()}
      </div>
    </div>
  )
}

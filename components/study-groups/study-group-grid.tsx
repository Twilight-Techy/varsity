"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import StudyGroupCard from "./study-group-card"
import { studyGroups } from "@/lib/data/study-groups"
import { BookOpen, Calendar, Users } from "lucide-react"

interface StudyGroupGridProps {
  filter: "all" | "my-groups" | "upcoming" | "recommended"
  searchQuery: string
  courseFilter: string
  typeFilter: string
  statusFilter: string
}

export default function StudyGroupGrid({
  filter,
  searchQuery,
  courseFilter,
  typeFilter,
  statusFilter,
}: StudyGroupGridProps) {
  const [filteredGroups, setFilteredGroups] = useState(studyGroups)

  useEffect(() => {
    let result = [...studyGroups]

    // Apply main filter
    if (filter === "my-groups") {
      result = result.filter((group) => group.joined)
    } else if (filter === "upcoming") {
      result = result.filter((group) => {
        const nextSession = new Date(group.nextSession)
        const now = new Date()
        const threeDaysFromNow = new Date()
        threeDaysFromNow.setDate(now.getDate() + 3)
        return nextSession >= now && nextSession <= threeDaysFromNow
      })
    } else if (filter === "recommended") {
      // In a real app, this would be based on user's courses, interests, etc.
      result = result.filter((group) => group.recommended)
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (group) =>
          group.name.toLowerCase().includes(query) ||
          group.description.toLowerCase().includes(query) ||
          group.course?.toLowerCase().includes(query),
      )
    }

    // Apply course filter
    if (courseFilter !== "all") {
      result = result.filter((group) => group.courseId === courseFilter)
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((group) => group.meetingType === typeFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      if (statusFilter === "open") {
        result = result.filter((group) => group.members < group.maxMembers)
      } else if (statusFilter === "full") {
        result = result.filter((group) => group.members >= group.maxMembers)
      } else if (statusFilter === "joined") {
        result = result.filter((group) => group.joined)
      }
    }

    setFilteredGroups(result)
  }, [filter, searchQuery, courseFilter, typeFilter, statusFilter])

  if (filteredGroups.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-8">
        <div className="flex justify-center mb-4">
          {filter === "my-groups" ? (
            <Users className="h-12 w-12 text-foreground/20" />
          ) : filter === "upcoming" ? (
            <Calendar className="h-12 w-12 text-foreground/20" />
          ) : (
            <BookOpen className="h-12 w-12 text-foreground/20" />
          )}
        </div>
        <h3 className="text-lg font-medium mb-2">No study groups found</h3>
        <p className="text-foreground/70 max-w-md mx-auto">
          {filter === "my-groups"
            ? "You haven't joined any study groups yet."
            : filter === "upcoming"
              ? "There are no upcoming study sessions in the next few days."
              : `No study groups match your current filters.`}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredGroups.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <StudyGroupCard group={group} />
        </motion.div>
      ))}
    </div>
  )
}

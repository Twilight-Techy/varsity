"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, MapPin, Video, Users, UserPlus, Check, Tag, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { StudyGroup } from "@/lib/types"
import { format } from "date-fns"

interface StudyGroupCardProps {
  group: StudyGroup
}

export default function StudyGroupCard({ group }: StudyGroupCardProps) {
  const [joined, setJoined] = useState(group.joined)
  const [isHovering, setIsHovering] = useState(false)

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setJoined(!joined)
  }

  const isFull = group.members >= group.maxMembers

  const formatNextSession = () => {
    try {
      const date = new Date(group.nextSession)
      return format(date, "EEE, MMM d, h:mm a")
    } catch (e) {
      return "No upcoming sessions"
    }
  }

  return (
    <Link
      href={`/study-groups/${group.id}`}
      className="block h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={cn(
          "h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg hover:border-foreground/20 transition-all",
          isHovering && "border-blue-500/30",
        )}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              {group.courseId && (
                <Badge variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20 mr-2">
                  <BookOpen className="h-3 w-3 mr-1" /> {group.course}
                </Badge>
              )}
              {group.meetingType === "online" ? (
                <Badge variant="outline" className="bg-purple-600/10 text-purple-500 border-purple-500/20">
                  <Video className="h-3 w-3 mr-1" /> Online
                </Badge>
              ) : group.meetingType === "in-person" ? (
                <Badge variant="outline" className="bg-green-600/10 text-green-500 border-green-500/20">
                  <MapPin className="h-3 w-3 mr-1" /> In-Person
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-600/10 text-yellow-500 border-yellow-500/20">
                  <ExternalLink className="h-3 w-3 mr-1" /> Hybrid
                </Badge>
              )}
            </div>
            {isFull && (
              <Badge variant="outline" className="bg-red-600/10 text-red-500 border-red-500/20">
                Full
              </Badge>
            )}
          </div>

          <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
          <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{group.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-foreground/70">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              <span>Next: {formatNextSession()}</span>
            </div>
            {group.location && (
              <div className="flex items-center text-sm text-foreground/70">
                <MapPin className="h-4 w-4 mr-2 text-green-500" />
                <span className="truncate">{group.location}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-foreground/70">
              <Users className="h-4 w-4 mr-2 text-purple-500" />
              <span>
                {group.members} / {group.maxMembers === 0 ? "∞" : group.maxMembers} members
              </span>
            </div>
          </div>

          {group.tags && group.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {group.tags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  className="px-2 py-0.5 bg-foreground/10 text-foreground/70 rounded-full text-xs flex items-center"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </div>
              ))}
              {group.tags.length > 3 && (
                <div className="px-2 py-0.5 bg-foreground/10 text-foreground/70 rounded-full text-xs">
                  +{group.tags.length - 3} more
                </div>
              )}
            </div>
          )}

          <Button
            className={cn(
              "w-full",
              joined
                ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
                : isFull
                  ? "bg-foreground/10 text-foreground/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
            )}
            onClick={handleJoin}
            disabled={!joined && isFull}
          >
            {joined ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Joined
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" /> Join Group
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  )
}

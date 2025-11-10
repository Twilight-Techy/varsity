"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, BookOpen, GraduationCap, Users, UserPlus, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Community } from "@/lib/types"

interface CommunityCardProps {
  community: Community
}

export default function CommunityCard({ community }: CommunityCardProps) {
  const [joined, setJoined] = useState(community.joined)
  const [isHovering, setIsHovering] = useState(false)

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setJoined(!joined)
  }

  const getTypeIcon = () => {
    switch (community.type) {
      case "university":
        return <Building className="h-5 w-5 text-blue-500" />
      case "faculty":
        return <BookOpen className="h-5 w-5 text-purple-500" />
      case "department":
        return <GraduationCap className="h-5 w-5 text-green-500" />
      case "level":
        return <Users className="h-5 w-5 text-yellow-500" />
      default:
        return <Users className="h-5 w-5 text-blue-500" />
    }
  }

  const getGradientColors = () => {
    switch (community.type) {
      case "university":
        return "from-blue-600/20 to-blue-400/20"
      case "faculty":
        return "from-purple-600/20 to-purple-400/20"
      case "department":
        return "from-green-600/20 to-green-400/20"
      case "level":
        return "from-yellow-600/20 to-yellow-400/20"
      default:
        return "from-blue-600/20 to-blue-400/20"
    }
  }

  return (
    <Link
      href={`/communities/${community.id}`}
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
        <div className={`h-32 bg-gradient-to-r ${getGradientColors()} relative`}>
          {community.coverImage && (
            <img
              src={community.coverImage || "/placeholder.svg"}
              alt={community.name}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="p-5 -mt-10 relative">
          <div
            className={cn(
              "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto border-4 border-background",
              community.type === "university"
                ? "from-blue-600 to-blue-400"
                : community.type === "faculty"
                  ? "from-purple-600 to-purple-400"
                  : community.type === "department"
                    ? "from-green-600 to-green-400"
                    : "from-yellow-600 to-yellow-400",
            )}
          >
            {community.avatar ? (
              <img
                src={community.avatar || "/placeholder.svg"}
                alt={community.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              community.name.charAt(0)
            )}
          </div>

          <div className="text-center mb-4">
            <h3 className="font-semibold text-lg mb-1">{community.name}</h3>
            <div className="flex items-center justify-center gap-1 text-foreground/60 text-sm">
              {getTypeIcon()}
              <span className="capitalize">{community.type}</span>
            </div>
          </div>

          <p className="text-sm text-foreground/70 mb-4 line-clamp-2 text-center">{community.description}</p>

          <div className="flex items-center justify-between text-sm text-foreground/70 mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{community.members.toLocaleString()} members</span>
            </div>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, community.members))].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs",
                      i === 0 ? "bg-blue-500" : i === 1 ? "bg-purple-500" : i === 2 ? "bg-green-500" : "bg-yellow-500",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                {community.members > 3 && (
                  <div className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center text-xs">
                    +{community.members - 3}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            className={cn(
              "w-full",
              joined
                ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
            )}
            onClick={handleJoin}
          >
            {joined ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Joined
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" /> Join Community
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  )
}

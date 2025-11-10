"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, UserCheck } from "lucide-react"

// Sample connections data
const connections = [
  {
    id: "1",
    name: "Chioma Okafor",
    username: "chioma",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    department: "Computer Science",
    level: "300 Level",
    mutualConnections: 12,
    isFollowing: true,
  },
  {
    id: "2",
    name: "Emeka Eze",
    username: "emeka",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    department: "Computer Science",
    level: "300 Level",
    mutualConnections: 8,
    isFollowing: true,
  },
  {
    id: "3",
    name: "Amina Ibrahim",
    username: "amina",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    department: "Economics",
    level: "200 Level",
    mutualConnections: 5,
    isFollowing: false,
  },
  {
    id: "4",
    name: "Tunde Bakare",
    username: "tunde",
    avatar: null,
    department: "Computer Science",
    level: "300 Level",
    mutualConnections: 15,
    isFollowing: true,
  },
  {
    id: "5",
    name: "Ngozi Okafor",
    username: "ngozi",
    avatar: null,
    department: "Medicine",
    level: "400 Level",
    mutualConnections: 3,
    isFollowing: false,
  },
  {
    id: "6",
    name: "David Adeleke",
    username: "david",
    avatar: null,
    department: "Engineering",
    level: "300 Level",
    mutualConnections: 7,
    isFollowing: true,
  },
]

interface User {
  id: string
  name: string
  [key: string]: any
}

interface ConnectionsTabProps {
  user: User
}

export default function ConnectionsTab({ user }: ConnectionsTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [followingState, setFollowingState] = useState<Record<string, boolean>>(
    connections.reduce(
      (acc, connection) => {
        acc[connection.id] = connection.isFollowing
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const filteredConnections = connections.filter((connection) => {
    if (!searchQuery) return true
    return (
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const toggleFollow = (id: string) => {
    setFollowingState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Connections</h3>
          <p className="text-foreground/70">
            {connections.length} people connected with {user.name}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
          <Input
            placeholder="Search connections..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnections.map((connection) => (
          <div
            key={connection.id}
            className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm rounded-xl border border-foreground/10 p-4 hover:border-foreground/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                {connection.avatar ? (
                  <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-500 text-white">
                    {connection.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">
                  <a href={`/profile/${connection.username}`} className="hover:text-blue-500 transition-colors">
                    {connection.name}
                  </a>
                </h4>
                <p className="text-sm text-foreground/70 truncate">@{connection.username}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-green-600/10 text-green-500 border-green-500/20">
                {connection.department}
              </Badge>
              <Badge variant="outline" className="bg-yellow-600/10 text-yellow-500 border-yellow-500/20">
                {connection.level}
              </Badge>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-foreground/70">{connection.mutualConnections} mutual connections</p>
              <Button
                variant="ghost"
                size="sm"
                className={followingState[connection.id] ? "text-blue-500" : "text-foreground/70"}
                onClick={() => toggleFollow(connection.id)}
              >
                {followingState[connection.id] ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-1" /> Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-1" /> Follow
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredConnections.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No connections found</h3>
          <p className="text-foreground/70">Try a different search term or connect with more people.</p>
        </div>
      )}
    </div>
  )
}

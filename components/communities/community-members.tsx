"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreHorizontal, Shield, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { communityMembers } from "@/lib/data/community-members"

interface CommunityMembersProps {
  communityId: string
}

export default function CommunityMembers({ communityId }: CommunityMembersProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter members for this community and by search query
  const members = communityMembers
    .filter((member) => member.communityId === communityId)
    .filter((member) =>
      searchQuery
        ? member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    )

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-red-600/10 text-red-500 border-red-500/20">
            <Shield className="h-3 w-3 mr-1" /> Admin
          </Badge>
        )
      case "moderator":
        return (
          <Badge variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20">
            <Star className="h-3 w-3 mr-1" /> Moderator
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Community Members</h2>
          <p className="text-foreground/70">{members.length} members in this community</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
            <Input
              placeholder="Search members..."
              className="pl-9 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <UserPlus className="mr-2 h-4 w-4" /> Invite
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm rounded-xl border border-foreground/10 p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                {member.avatar ? (
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-500 text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{member.name}</h3>
                  {getRoleBadge(member.role)}
                </div>
                <p className="text-sm text-foreground/70">Joined {member.joinedDate}</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
                {member.role !== "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Remove from Community</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No members found</h3>
          <p className="text-foreground/70">Try a different search term.</p>
        </div>
      )}
    </div>
  )
}

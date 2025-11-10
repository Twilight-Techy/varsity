"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardNav from "@/components/dashboard/dashboard-nav"
import CommunitySidebar from "@/components/communities/community-sidebar"
import {
  PanelLeftIcon,
  PanelLeftCloseIcon,
  Users,
  Bell,
  BellOff,
  Settings,
  Share2,
  UserPlus,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Community } from "@/lib/types"
import CommunityPosts from "./community-posts"
import CommunityMembers from "./community-members"
import CommunityAbout from "./community-about"

interface CommunityDetailProps {
  community: Community
}

export default function CommunityDetail({ community }: CommunityDetailProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [joined, setJoined] = useState(community.joined)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleJoin = () => {
    setJoined(!joined)
  }

  const handleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const getTypeColor = () => {
    switch (community.type) {
      case "university":
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
      case "faculty":
        return "bg-purple-600/10 text-purple-500 border-purple-500/20"
      case "department":
        return "bg-green-600/10 text-green-500 border-green-500/20"
      case "level":
        return "bg-yellow-600/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
    }
  }

  const getGradientColors = () => {
    switch (community.type) {
      case "university":
        return "from-blue-600/30 to-blue-400/30"
      case "faculty":
        return "from-purple-600/30 to-purple-400/30"
      case "department":
        return "from-green-600/30 to-green-400/30"
      case "level":
        return "from-yellow-600/30 to-yellow-400/30"
      default:
        return "from-blue-600/30 to-blue-400/30"
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />
      <div className="flex flex-1 pt-16">
        {/* Mobile sidebar toggle */}
        <div className="fixed bottom-4 left-4 z-20 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg border-foreground/10 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelLeftCloseIcon className="h-5 w-5" /> : <PanelLeftIcon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-10 w-72 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-72 md:flex-shrink-0 pt-16 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <CommunitySidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Community header */}
          <div className={`w-full h-48 md:h-64 bg-gradient-to-r ${getGradientColors()} relative overflow-hidden`}>
            {community.coverImage && (
              <img
                src={community.coverImage || "/placeholder.svg"}
                alt={community.name}
                className="w-full h-full object-cover opacity-60"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 -mt-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <Avatar className="w-24 h-24 border-4 border-background">
                    {community.avatar ? (
                      <AvatarImage src={community.avatar || "/placeholder.svg"} alt={community.name} />
                    ) : (
                      <AvatarFallback
                        className={`text-2xl font-bold ${
                          community.type === "university"
                            ? "bg-gradient-to-br from-blue-600 to-blue-400"
                            : community.type === "faculty"
                              ? "bg-gradient-to-br from-purple-600 to-purple-400"
                              : community.type === "department"
                                ? "bg-gradient-to-br from-green-600 to-green-400"
                                : "bg-gradient-to-br from-yellow-600 to-yellow-400"
                        } text-white`}
                      >
                        {community.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h1 className="text-2xl md:text-3xl font-bold">{community.name}</h1>
                          <Badge variant="outline" className={getTypeColor()}>
                            <span className="capitalize">{community.type}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-foreground/70">
                          <Users className="h-4 w-4" />
                          <span>{community.members.toLocaleString()} members</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={joined ? "outline" : "default"}
                          className={
                            joined
                              ? "border-foreground/20"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          }
                          onClick={handleJoin}
                        >
                          {joined ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Joined
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2 h-4 w-4" /> Join
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="border-foreground/20" onClick={handleNotifications}>
                          {notificationsEnabled ? (
                            <>
                              <Bell className="mr-2 h-4 w-4" /> Notifications On
                            </>
                          ) : (
                            <>
                              <BellOff className="mr-2 h-4 w-4" /> Notifications Off
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="border-foreground/20">
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                        {community.isAdmin && (
                          <Button variant="outline" className="border-foreground/20">
                            <Settings className="mr-2 h-4 w-4" /> Manage
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="posts" className="mt-8">
                  <TabsList className="w-full border-b border-foreground/10 bg-transparent p-0 mb-6">
                    <TabsTrigger
                      value="posts"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      Posts
                    </TabsTrigger>
                    <TabsTrigger
                      value="about"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="members"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      Members
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="posts" className="mt-0">
                    <CommunityPosts communityId={community.id} />
                  </TabsContent>

                  <TabsContent value="about" className="mt-0">
                    <CommunityAbout community={community} />
                  </TabsContent>

                  <TabsContent value="members" className="mt-0">
                    <CommunityMembers communityId={community.id} />
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

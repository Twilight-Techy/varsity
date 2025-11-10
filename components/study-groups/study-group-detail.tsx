"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardNav from "@/components/dashboard/dashboard-nav"
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
  Calendar,
  MessageSquare,
  FileText,
  ExternalLink,
  Search,
  MapPin,
  BookOpen,
  Clock,
  User,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import type { StudyGroup } from "@/lib/types"
import VerificationBanner from "@/components/verification/verification-banner"

interface StudyGroupDetailProps {
  studyGroup: StudyGroup
}

export default function StudyGroupDetail({ studyGroup }: StudyGroupDetailProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [joined, setJoined] = useState(studyGroup.joined)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const isVerified = false // In a real app, this would come from auth state

  const handleJoin = () => {
    if (!isVerified) {
      // Show verification required message
      return
    }
    setJoined(!joined)
  }

  const handleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const getMeetingTypeColor = () => {
    switch (studyGroup.meetingType) {
      case "in-person":
        return "bg-green-600/10 text-green-500 border-green-500/20"
      case "online":
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
      case "hybrid":
        return "bg-purple-600/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNav />
      {!isVerified && <VerificationBanner />}
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
          <div className="h-full bg-background border-r border-foreground/10 flex flex-col">
            <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Study Groups</h2>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
                <PanelLeftCloseIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                asChild
              >
                <Link href="/study-groups/create">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Study Group
                </Link>
              </Button>
            </div>

            <div className="p-4 border-t border-foreground/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <Input placeholder="Search groups..." className="pl-9" />
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm mb-2">Your Study Groups</h3>
                {/* List of user's study groups would go here */}
                <div className="p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                      DS
                    </div>
                    <div>
                      <p className="font-medium text-sm">Data Structures Study Group</p>
                      <p className="text-xs text-foreground/70">8 members</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                      DB
                    </div>
                    <div>
                      <p className="font-medium text-sm">Database Systems Group</p>
                      <p className="text-xs text-foreground/70">12 members</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-medium text-sm mb-2">Recommended Groups</h3>
                {/* List of recommended study groups would go here */}
                <div className="p-2 rounded-lg hover:bg-foreground/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                      AI
                    </div>
                    <div>
                      <p className="font-medium text-sm">AI & Machine Learning</p>
                      <p className="text-xs text-foreground/70">15 members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-foreground/10">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/study-groups">Browse All Groups</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Group header */}
          <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-600/30 to-purple-600/30 relative overflow-hidden">
            {studyGroup.coverImage && (
              <img
                src={studyGroup.coverImage || "/placeholder.svg"}
                alt={studyGroup.name}
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
                    {studyGroup.avatar ? (
                      <AvatarImage src={studyGroup.avatar || "/placeholder.svg"} alt={studyGroup.name} />
                    ) : (
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        {studyGroup.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h1 className="text-2xl md:text-3xl font-bold">{studyGroup.name}</h1>
                          <Badge variant="outline" className={getMeetingTypeColor()}>
                            <span className="capitalize">{studyGroup.meetingType}</span>
                          </Badge>
                          {studyGroup.course && (
                            <Badge variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20">
                              {studyGroup.course}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-foreground/70">
                          <Users className="h-4 w-4" />
                          <span>
                            {studyGroup.members.length} / {studyGroup.maxMembers} members
                          </span>
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
                          disabled={!isVerified && !joined}
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
                        {joined && (
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
                        )}
                        <Button variant="outline" className="border-foreground/20">
                          <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                        {studyGroup.isAdmin && (
                          <Button variant="outline" className="border-foreground/20">
                            <Settings className="mr-2 h-4 w-4" /> Manage
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="about" className="mt-8">
                  <TabsList className="w-full border-b border-foreground/10 bg-transparent p-0 mb-6">
                    <TabsTrigger
                      value="about"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      About
                    </TabsTrigger>
                    <TabsTrigger
                      value="discussions"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      Discussions
                    </TabsTrigger>
                    <TabsTrigger
                      value="sessions"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      Sessions
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      Resources
                    </TabsTrigger>
                    <TabsTrigger
                      value="members"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                    >
                      Members
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">About This Group</h3>
                        <p className="text-foreground/80">{studyGroup.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Meeting Details</h3>
                          <div className="space-y-3 bg-foreground/5 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Schedule</h4>
                                <p className="text-sm text-foreground/70">{studyGroup.schedule}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Location</h4>
                                <p className="text-sm text-foreground/70">{studyGroup.location}</p>
                              </div>
                            </div>
                            {studyGroup.meetingLink && (
                              <div className="flex items-start gap-3">
                                <ExternalLink className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                  <h4 className="font-medium">Meeting Link</h4>
                                  <a
                                    href={studyGroup.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500 hover:underline"
                                  >
                                    {studyGroup.meetingLink}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Group Info</h3>
                          <div className="space-y-3 bg-foreground/5 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Members</h4>
                                <p className="text-sm text-foreground/70">
                                  {studyGroup.members.length} / {studyGroup.maxMembers} members
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Course</h4>
                                <p className="text-sm text-foreground/70">{studyGroup.course || "Not specified"}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Created</h4>
                                <p className="text-sm text-foreground/70">
                                  {new Date(studyGroup.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Group Goals</h3>
                        <ul className="list-disc list-inside space-y-1 text-foreground/80">
                          {studyGroup.goals.map((goal, index) => (
                            <li key={index}>{goal}</li>
                          ))}
                        </ul>
                      </div>

                      {studyGroup.rules.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-2">Group Rules</h3>
                          <ul className="list-disc list-inside space-y-1 text-foreground/80">
                            {studyGroup.rules.map((rule, index) => (
                              <li key={index}>{rule}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-medium mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {studyGroup.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-foreground/5">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="discussions" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Discussions</h3>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <MessageSquare className="mr-2 h-4 w-4" /> New Discussion
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {/* Discussion items would go here */}
                        <div className="p-4 border border-foreground/10 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">John Doe</h4>
                                  <p className="text-xs text-foreground/70">2 days ago</p>
                                </div>
                                <Badge variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20">
                                  Question
                                </Badge>
                              </div>
                              <h3 className="font-medium mt-2">Help with Binary Search Trees</h3>
                              <p className="text-sm text-foreground/80 mt-1">
                                I'm having trouble understanding the balancing algorithm for BSTs. Can someone explain
                                how rotations work?
                              </p>
                              <div className="flex items-center gap-4 mt-3">
                                <Button variant="ghost" size="sm" className="text-foreground/70">
                                  <MessageSquare className="mr-2 h-4 w-4" /> 5 Replies
                                </Button>
                                <Button variant="ghost" size="sm" className="text-foreground/70">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-foreground/10 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-purple-600 text-white">AM</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">Alice Miller</h4>
                                  <p className="text-xs text-foreground/70">5 days ago</p>
                                </div>
                                <Badge variant="outline" className="bg-green-600/10 text-green-500 border-green-500/20">
                                  Announcement
                                </Badge>
                              </div>
                              <h3 className="font-medium mt-2">Next Study Session Schedule</h3>
                              <p className="text-sm text-foreground/80 mt-1">
                                Our next study session will be on Friday at 3 PM in the library. We'll be covering
                                chapters 5-7. Don't forget to bring your textbooks!
                              </p>
                              <div className="flex items-center gap-4 mt-3">
                                <Button variant="ghost" size="sm" className="text-foreground/70">
                                  <MessageSquare className="mr-2 h-4 w-4" /> 2 Replies
                                </Button>
                                <Button variant="ghost" size="sm" className="text-foreground/70">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sessions" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Study Sessions</h3>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Calendar className="mr-2 h-4 w-4" /> Schedule Session
                        </Button>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Upcoming Sessions</h4>
                        <div className="space-y-4">
                          <div className="p-4 border border-foreground/10 rounded-lg bg-gradient-to-r from-blue-600/5 to-purple-600/5">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h4 className="font-medium">Final Exam Preparation</h4>
                                <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>Friday, June 10, 2023</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                                  <Clock className="h-4 w-4" />
                                  <span>3:00 PM - 5:00 PM</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>Main Library, Study Room 3</span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button variant="outline" size="sm">
                                  <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Bell className="mr-2 h-4 w-4" /> Set Reminder
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Past Sessions</h4>
                        <div className="space-y-4">
                          <div className="p-4 border border-foreground/10 rounded-lg">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h4 className="font-medium">Midterm Review</h4>
                                <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>May 15, 2023</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                                  <Clock className="h-4 w-4" />
                                  <span>2:00 PM - 4:00 PM</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/70 mt-1">
                                  <Users className="h-4 w-4" />
                                  <span>8 attendees</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" /> View Notes
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Study Resources</h3>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <FileText className="mr-2 h-4 w-4" /> Add Resource
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 border border-foreground/10 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Data Structures Cheat Sheet</h4>
                                <Badge variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20">
                                  PDF
                                </Badge>
                              </div>
                              <p className="text-sm text-foreground/70 mt-1">
                                A comprehensive cheat sheet covering all the data structures we've learned.
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2 text-xs text-foreground/70">
                                  <User className="h-3 w-3" />
                                  <span>Shared by John Doe</span>
                                  <span>•</span>
                                  <span>2 weeks ago</span>
                                </div>
                                <Button variant="outline" size="sm">
                                  <Download className="mr-2 h-4 w-4" /> Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-foreground/10 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-600/10 flex items-center justify-center">
                              <ExternalLink className="h-5 w-5 text-purple-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Visualization Tool for Algorithms</h4>
                                <Badge
                                  variant="outline"
                                  className="bg-purple-600/10 text-purple-500 border-purple-500/20"
                                >
                                  Link
                                </Badge>
                              </div>
                              <p className="text-sm text-foreground/70 mt-1">
                                An interactive tool that helps visualize how different algorithms work.
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2 text-xs text-foreground/70">
                                  <User className="h-3 w-3" />
                                  <span>Shared by Alice Miller</span>
                                  <span>•</span>
                                  <span>1 month ago</span>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <a href="#" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="members" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Group Members</h3>
                        {studyGroup.isAdmin && (
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                            <UserPlus className="mr-2 h-4 w-4" /> Invite Members
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {studyGroup.members.map((member, index) => (
                          <div key={index} className="p-4 border border-foreground/10 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback className="bg-blue-600 text-white">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{member.name}</h4>
                                  {member.role === "admin" && (
                                    <Badge
                                      variant="outline"
                                      className="bg-blue-600/10 text-blue-500 border-blue-500/20"
                                    >
                                      Admin
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-foreground/70">{member.status}</p>
                              </div>
                            </div>
                            {studyGroup.isAdmin && member.role !== "admin" && (
                              <div className="mt-3 flex justify-end">
                                <Button variant="outline" size="sm">
                                  <Settings className="mr-2 h-4 w-4" /> Manage
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
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

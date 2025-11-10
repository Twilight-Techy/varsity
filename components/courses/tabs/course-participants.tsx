"use client"

import { useState } from "react"
import type { Course } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, User, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CourseParticipants({ course }: { course: Course }) {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredParticipants = course.participants.filter((participant) => {
    // Apply search filter
    if (
      searchQuery &&
      !participant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !participant.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply tab filter
    if (filter === "all") return true
    if (filter === "instructors") return participant.role === "Instructor" || participant.role === "TA"
    if (filter === "students") return participant.role === "Student"
    return true
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Instructor":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "TA":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Student":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Course Participants</CardTitle>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Total: {course.participants.length} participants</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search participants..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="instructors">Instructors & TAs</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredParticipants.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">No participants found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParticipants.map((participant) => (
              <Card key={participant.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{participant.name}</h3>
                        <Badge className={`${getRoleBadgeColor(participant.role)} whitespace-nowrap`}>
                          {participant.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{participant.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Button size="sm" variant="outline" className="w-full gap-1">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </Button>
                    <Button size="sm" variant="outline" className="w-full gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Message</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

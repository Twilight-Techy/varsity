"use client"

import { useState } from "react"
import type { Course } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Plus, Search, ThumbsUp, MessageCircle } from "lucide-react"

export default function CourseDiscussions({ course }: { course: Course }) {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDiscussions = course.discussions.filter((discussion) => {
    // Apply search filter
    if (searchQuery && !discussion.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Apply tab filter
    if (filter === "all") return true
    if (filter === "questions") return discussion.type === "question"
    if (filter === "announcements") return discussion.type === "announcement"
    if (filter === "general") return discussion.type === "general"
    return true
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "question":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "announcement":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "general":
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
            <CardTitle>Course Discussions</CardTitle>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="announcements">Announcements</TabsTrigger>
                  <TabsTrigger value="general">General</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredDiscussions.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">No discussions found</h3>
            <p className="text-muted-foreground mt-1">There are no discussions matching your current filter</p>
          </div>
        ) : (
          filteredDiscussions.map((discussion) => (
            <Card key={discussion.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    {discussion.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{discussion.title}</h3>
                      <Badge className={`${getTypeColor(discussion.type)} capitalize`}>{discussion.type}</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span>{discussion.author.name}</span>
                      <span>•</span>
                      <span>{discussion.date}</span>
                    </div>

                    <p className="text-muted-foreground mb-4">{discussion.preview}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{discussion.likes} Likes</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{discussion.replies} Replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

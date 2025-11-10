"use client"

import { useState } from "react"
import type { Course } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, FileText, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function CourseAssignments({ course }: { course: Course }) {
  const [filter, setFilter] = useState("all")

  const filteredAssignments = course.assignmentList.filter((assignment) => {
    if (filter === "all") return true
    if (filter === "upcoming") return assignment.status === "upcoming"
    if (filter === "completed") return assignment.status === "completed"
    if (filter === "past-due") return assignment.status === "past-due"
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "past-due":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Upcoming"
      case "completed":
        return "Completed"
      case "past-due":
        return "Past Due"
      default:
        return status
    }
  }

  // Calculate completion percentage
  const completedCount = course.assignmentList.filter((a) => a.status === "completed").length
  const totalCount = course.assignmentList.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Assignments Overview</CardTitle>
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="past-due">Past Due</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completion Progress</span>
                  <span className="text-sm font-medium">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {course.assignmentList.filter((a) => a.status === "upcoming").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{completedCount}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {course.assignmentList.filter((a) => a.status === "past-due").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Past Due</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">No assignments found</h3>
            <p className="text-muted-foreground mt-1">There are no assignments matching your current filter</p>
          </div>
        ) : (
          filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="overflow-hidden">
              <div
                className="h-1"
                style={{
                  background:
                    assignment.status === "upcoming"
                      ? "linear-gradient(to right, #3b82f6, #2563eb)"
                      : assignment.status === "completed"
                        ? "linear-gradient(to right, #22c55e, #10b981)"
                        : "linear-gradient(to right, #ef4444, #dc2626)",
                }}
              />
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{assignment.title}</h3>
                      <Badge className={`${getStatusColor(assignment.status)}`}>
                        {getStatusText(assignment.status)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{assignment.description}</p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Time: {assignment.dueTime}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Points: {assignment.points}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Button
                      className={
                        assignment.status === "completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      }
                    >
                      {assignment.status === "completed" ? (
                        "View Submission"
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Assignment
                        </>
                      )}
                    </Button>
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

import type { Course } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bell, BookOpen, Calendar, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function CourseHeader({ course }: { course: Course }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "upcoming":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/courses">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Course Details</h1>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div
          className="h-3"
          style={{
            background:
              course.status === "active"
                ? "linear-gradient(to right, #22c55e, #10b981)"
                : course.status === "completed"
                  ? "linear-gradient(to right, #3b82f6, #2563eb)"
                  : "linear-gradient(to right, #a855f7, #8b5cf6)",
          }}
        />

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{course.code}</h2>
                <Badge className={`${getStatusColor(course.status)} capitalize`}>{course.status}</Badge>
              </div>
              <h3 className="text-xl font-medium mb-4">{course.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Instructor: {course.instructor.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{course.schedule.days.join(", ")}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{course.schedule.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{course.credits} Credits</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:items-end">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Bell className="mr-2 h-4 w-4" />
                Subscribe to Updates
              </Button>
              <div className="text-sm text-muted-foreground">{course.students} students enrolled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

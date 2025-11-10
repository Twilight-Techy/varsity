import Link from "next/link"
import type { Course } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Users, BookOpen } from "lucide-react"

export default function CourseCard({ course }: { course: Course }) {
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
    <Link href={`/courses/${course.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800">
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
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{course.code}</h3>
              <p className="text-muted-foreground text-sm">{course.department}</p>
            </div>
            <Badge className={`${getStatusColor(course.status)} capitalize`}>{course.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <h4 className="font-medium mb-2">{course.title}</h4>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Users className="h-4 w-4 mr-2" />
            <span>Instructor: {course.instructor.name}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>
              {course.schedule.days.join(", ")} • {course.schedule.time}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{course.credits} Credits</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2 text-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
              <span>{course.assignments} Assignments</span>
            </div>
            <span className="text-muted-foreground">{course.students} Students</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

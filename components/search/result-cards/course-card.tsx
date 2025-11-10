import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Users } from "lucide-react"

interface CourseCardProps {
  course: {
    id: string
    code: string
    name: string
    department: string
    instructor: string
    studentCount: number
    description: string
    isEnrolled: boolean
  }
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:border-blue-500/50 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="text-sm font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">{course.code}</span>
            <Link href={`/courses/${course.id}`} className="hover:underline">
              {course.name}
            </Link>
          </h3>

          <div className="mt-1 text-sm text-muted-foreground">
            {course.department} • {course.instructor} • {course.studentCount} students
          </div>
        </div>

        <Button
          variant={course.isEnrolled ? "outline" : "default"}
          size="sm"
          className={
            course.isEnrolled
              ? ""
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          }
        >
          <BookOpen className="h-4 w-4 mr-1" />
          {course.isEnrolled ? "Enrolled" : "Enroll"}
        </Button>
      </div>

      <p className="mt-3 text-sm line-clamp-2">{course.description}</p>

      {course.isEnrolled && (
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">You and {course.studentCount - 1} others are enrolled</span>
        </div>
      )}
    </div>
  )
}

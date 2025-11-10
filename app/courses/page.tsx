import type { Metadata } from "next"
import CoursesLayout from "@/components/courses/courses-layout"
import CourseGrid from "@/components/courses/course-grid"
import { getCourses } from "@/lib/data/courses"

export const metadata: Metadata = {
  title: "Courses | Varsity",
  description: "Browse and manage your courses on Varsity",
}

export default function CoursesPage() {
  const courses = getCourses()

  return (
    <CoursesLayout>
      <CourseGrid courses={courses} />
    </CoursesLayout>
  )
}

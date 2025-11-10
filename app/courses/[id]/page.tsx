import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CourseDetail from "@/components/courses/course-detail"
import { getCourseById } from "@/lib/data/courses"

export const metadata: Metadata = {
  title: "Course Details | Varsity",
  description: "View course details, syllabus, assignments, and discussions",
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id)

  if (!course) {
    notFound()
  }

  return <CourseDetail course={course} />
}

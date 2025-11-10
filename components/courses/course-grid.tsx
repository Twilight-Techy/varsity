"use client"

import { useState, useEffect } from "react"
import type { Course } from "@/lib/types"
import CourseCard from "./course-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function CourseGrid({ courses }: { courses: Course[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCourses, setFilteredCourses] = useState(courses)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courses)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredCourses(
        courses.filter(
          (course) =>
            course.code.toLowerCase().includes(query) ||
            course.title.toLowerCase().includes(query) ||
            course.instructor.name.toLowerCase().includes(query) ||
            course.department.toLowerCase().includes(query),
        ),
      )
    }
  }, [searchQuery, courses])

  return (
    <div>
      <div className="relative mb-6 md:hidden">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No courses found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}

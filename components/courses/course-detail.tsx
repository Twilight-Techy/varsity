"use client"

import { useState } from "react"
import type { Course } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseSyllabus from "./tabs/course-syllabus"
import CourseAssignments from "./tabs/course-assignments"
import CourseDiscussions from "./tabs/course-discussions"
import CourseResources from "./tabs/course-resources"
import CourseParticipants from "./tabs/course-participants"
import CourseHeader from "./course-header"

export default function CourseDetail({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState("syllabus")

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader course={course} />

      <Tabs defaultValue="syllabus" className="mt-8" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
        </TabsList>

        <TabsContent value="syllabus">
          <CourseSyllabus course={course} />
        </TabsContent>

        <TabsContent value="assignments">
          <CourseAssignments course={course} />
        </TabsContent>

        <TabsContent value="discussions">
          <CourseDiscussions course={course} />
        </TabsContent>

        <TabsContent value="resources">
          <CourseResources course={course} />
        </TabsContent>

        <TabsContent value="participants">
          <CourseParticipants course={course} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

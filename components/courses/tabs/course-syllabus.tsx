import type { Course } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, MapPin, User } from "lucide-react"

export default function CourseSyllabus({ course }: { course: Course }) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{course.description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CalendarDays className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Days</p>
                      <p className="text-muted-foreground">{course.schedule.days.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{course.schedule.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{course.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Instructor</h3>
                <div className="flex items-start">
                  <User className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-muted-foreground">{course.instructor.email}</p>
                    <p className="text-muted-foreground mt-1">Office Hours: {course.instructor.officeHours}</p>
                    <p className="text-muted-foreground">Office: {course.instructor.office}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Course Objectives</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {course.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {course.schedule.weeks.map((week, index) => (
              <div key={index}>
                <h3 className="font-medium mb-3">
                  Week {week.week}: {week.topic}
                </h3>
                <p className="text-muted-foreground mb-2">{week.description}</p>

                {week.readings && week.readings.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Readings:</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {week.readings.map((reading, idx) => (
                        <li key={idx}>{reading}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {index < course.schedule.weeks.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Grading Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Grade Distribution</h3>
                <div className="space-y-2">
                  {course.grading.distribution.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{item.category}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Grading Scale</h3>
                <div className="space-y-2">
                  {course.grading.scale.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{item.grade}</span>
                      <span className="font-medium">{item.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Course Policies</h3>
              <div className="space-y-3">
                {course.policies.map((policy, index) => (
                  <div key={index}>
                    <h4 className="font-medium">{policy.title}</h4>
                    <p className="text-muted-foreground">{policy.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

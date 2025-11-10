import type { Course } from "@/lib/types"

const courses: Course[] = [
  {
    id: "cs101",
    code: "CS 101",
    title: "Introduction to Computer Science",
    department: "Computer Science",
    credits: 3,
    status: "active",
    description:
      "An introduction to the basic concepts of computer science, including algorithms, programming languages, and computing systems.",
    instructor: {
      name: "Dr. Jane Smith",
      email: "jsmith@university.edu",
      office: "Science Building, Room 405",
      officeHours: "Mon, Wed 2:00 PM - 4:00 PM",
    },
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "10:00 AM - 11:15 AM",
      weeks: [],
    },
    location: "Science Building, Room 101",
    students: 120,
    assignments: 8,
    objectives: [],
    grading: {
      distribution: [],
      scale: [],
    },
    policies: [],
    assignmentList: [],
    discussions: [],
    resources: [],
    textbooks: [],
    participants: [],
  },
  {
    id: "math201",
    code: "MATH 201",
    title: "Calculus II",
    department: "Mathematics",
    credits: 4,
    status: "active",
    description:
      "A continuation of Calculus I, covering integration techniques, applications of integration, infinite sequences and series, and parametric equations.",
    instructor: {
      name: "Dr. Robert Chen",
      email: "rchen@university.edu",
      office: "Math Building, Room 302",
      officeHours: "Tue, Thu 1:00 PM - 3:00 PM",
    },
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "9:30 AM - 11:30 AM",
      weeks: [],
    },
    location: "Math Building, Room 105",
    students: 85,
    assignments: 10,
    objectives: [],
    grading: {
      distribution: [],
      scale: [],
    },
    policies: [],
    assignmentList: [],
    discussions: [],
    resources: [],
    textbooks: [],
    participants: [],
  },
]

export function getCourses(): Course[] {
  return courses
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

export { courses }

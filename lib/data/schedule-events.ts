export interface ScheduleEvent {
  id: string
  title: string
  type: "lecture" | "lab" | "tutorial" | "exam" | "meeting"
  startTime: string
  endTime: string
  location?: string
  instructor?: string
  course?: string
  description?: string
  recurring?: boolean
  recurrencePattern?: "daily" | "weekly" | "biweekly" | "monthly"
}

// Helper function to create dates relative to today
const createDate = (dayOffset: number, hours: number, minutes = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + dayOffset)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    title: "Data Structures Lecture",
    type: "lecture",
    startTime: createDate(0, 10, 0), // Today at 10:00 AM
    endTime: createDate(0, 12, 0), // Today at 12:00 PM
    location: "Room 401, Computer Science Building",
    instructor: "Dr. Adebayo",
    course: "CS 301: Data Structures",
    description: "Lecture on balanced binary search trees and their implementation.",
    recurring: true,
    recurrencePattern: "weekly",
  },
  {
    id: "2",
    title: "Database Systems Lab",
    type: "lab",
    startTime: createDate(0, 14, 0), // Today at 2:00 PM
    endTime: createDate(0, 16, 0), // Today at 4:00 PM
    location: "Lab 2, Computer Science Building",
    instructor: "Prof. Okonkwo",
    course: "CS 305: Database Systems",
    description: "Practical session on SQL queries and database normalization.",
    recurring: true,
    recurrencePattern: "weekly",
  },
  {
    id: "3",
    title: "Linear Algebra Tutorial",
    type: "tutorial",
    startTime: createDate(1, 9, 0), // Tomorrow at 9:00 AM
    endTime: createDate(1, 10, 30), // Tomorrow at 10:30 AM
    location: "Room 205, Mathematics Building",
    instructor: "Dr. Nnamdi",
    course: "MTH 301: Linear Algebra",
    description: "Tutorial session on eigenvalues and eigenvectors.",
    recurring: true,
    recurrencePattern: "weekly",
  },
  {
    id: "4",
    title: "Computer Networks Lecture",
    type: "lecture",
    startTime: createDate(1, 13, 0), // Tomorrow at 1:00 PM
    endTime: createDate(1, 15, 0), // Tomorrow at 3:00 PM
    location: "Room 302, Computer Science Building",
    instructor: "Prof. Adeyemi",
    course: "CS 310: Computer Networks",
    description: "Lecture on network protocols and routing algorithms.",
    recurring: true,
    recurrencePattern: "weekly",
  },
  {
    id: "5",
    title: "Mid-term Exam",
    type: "exam",
    startTime: createDate(3, 10, 0), // 3 days from now at 10:00 AM
    endTime: createDate(3, 12, 0), // 3 days from now at 12:00 PM
    location: "Main Auditorium",
    course: "CS 301: Data Structures",
    description: "Mid-term examination covering all topics discussed so far.",
  },
  {
    id: "6",
    title: "Study Group Meeting",
    type: "meeting",
    startTime: createDate(2, 16, 0), // 2 days from now at 4:00 PM
    endTime: createDate(2, 18, 0), // 2 days from now at 6:00 PM
    location: "Library, Study Room 3",
    description: "Group study session for the upcoming Data Structures mid-term exam.",
  },
  {
    id: "7",
    title: "Database Project Meeting",
    type: "meeting",
    startTime: createDate(4, 15, 0), // 4 days from now at 3:00 PM
    endTime: createDate(4, 16, 30), // 4 days from now at 4:30 PM
    location: "Student Center",
    description: "Team meeting to discuss progress on the database project.",
  },
  {
    id: "8",
    title: "Programming Lab",
    type: "lab",
    startTime: createDate(5, 13, 0), // 5 days from now at 1:00 PM
    endTime: createDate(5, 15, 0), // 5 days from now at 3:00 PM
    location: "Lab 1, Computer Science Building",
    instructor: "Dr. Adebayo",
    course: "CS 301: Data Structures",
    description: "Practical session on implementing balanced binary search trees.",
    recurring: true,
    recurrencePattern: "weekly",
  },
  {
    id: "9",
    title: "Office Hours",
    type: "meeting",
    startTime: createDate(2, 11, 0), // 2 days from now at 11:00 AM
    endTime: createDate(2, 12, 0), // 2 days from now at 12:00 PM
    location: "Room 405, Computer Science Building",
    instructor: "Prof. Okonkwo",
    description: "Office hours for Database Systems course.",
    recurring: true,
    recurrencePattern: "weekly",
  },
  {
    id: "10",
    title: "Research Seminar",
    type: "lecture",
    startTime: createDate(6, 14, 0), // 6 days from now at 2:00 PM
    endTime: createDate(6, 16, 0), // 6 days from now at 4:00 PM
    location: "Conference Room, Faculty of Engineering",
    description: "Research seminar on recent advances in artificial intelligence.",
  },
]

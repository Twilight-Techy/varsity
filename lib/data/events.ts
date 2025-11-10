export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  category: string
  image?: string
  isVirtual: boolean
  attendees: number
  capacity?: number
  price: number
  createdBy?: string // User ID of the creator
  createdAt: string // ISO date string
  updatedAt?: string // ISO date string
}

const events: Event[] = [
  {
    id: "1",
    title: "Spring Career Fair 2023",
    description:
      "Connect with top employers from various industries and explore internship and job opportunities. Bring your resume and dress professionally for this networking event.",
    date: "April 28, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "University Center, Grand Hall",
    organizer: "Career Services",
    category: "Career",
    image: "/placeholder.svg?height=400&width=600&text=Career+Fair",
    isVirtual: false,
    attendees: 245,
    capacity: 500,
    price: 0,
    createdBy: "user1",
    createdAt: "2023-03-15T10:30:00Z",
  },
  {
    id: "2",
    title: "AI Workshop Series: Machine Learning Fundamentals",
    description:
      "Learn the basics of machine learning algorithms and their applications in this hands-on workshop led by industry experts and faculty researchers.",
    date: "May 5, 2023",
    time: "1:00 PM - 4:00 PM",
    location: "Virtual Event",
    organizer: "Computer Science Department",
    category: "Workshop",
    image: "/placeholder.svg?height=400&width=600&text=AI+Workshop",
    isVirtual: true,
    attendees: 178,
    price: 0,
    createdBy: "user2",
    createdAt: "2023-03-20T14:15:00Z",
  },
  {
    id: "3",
    title: "End of Year Celebration",
    description:
      "Join us for food, music, and fun as we celebrate the end of the academic year and recognize student achievements.",
    date: "May 15, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Campus Quad",
    organizer: "Student Activities Board",
    category: "Social",
    image: "/placeholder.svg?height=400&width=600&text=Celebration",
    isVirtual: false,
    attendees: 320,
    capacity: 1000,
    price: 5,
    createdBy: "user1",
    createdAt: "2023-03-25T09:45:00Z",
  },
  {
    id: "4",
    title: "Research Symposium",
    description:
      "Undergraduate and graduate students present their research projects across all disciplines. Come support your peers and learn about cutting-edge research happening on campus.",
    date: "May 8, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "Science Building, Rooms 101-105",
    organizer: "Office of Research",
    category: "Academic",
    image: "/placeholder.svg?height=400&width=600&text=Research",
    isVirtual: false,
    attendees: 150,
    capacity: 300,
    price: 0,
    createdBy: "user3",
    createdAt: "2023-03-30T11:20:00Z",
  },
  {
    id: "5",
    title: "Guest Lecture: The Future of Renewable Energy",
    description:
      "Distinguished speaker Dr. Elena Rodriguez discusses the latest innovations in renewable energy technology and policy implications for climate change mitigation.",
    date: "May 12, 2023",
    time: "4:00 PM - 5:30 PM",
    location: "Engineering Building, Auditorium",
    organizer: "Environmental Science Department",
    category: "Academic",
    image: "/placeholder.svg?height=400&width=600&text=Lecture",
    isVirtual: false,
    attendees: 89,
    capacity: 200,
    price: 0,
    createdBy: "user2",
    createdAt: "2023-04-02T13:10:00Z",
  },
  {
    id: "6",
    title: "Startup Weekend",
    description:
      "Form teams, build prototypes, and pitch your business ideas to judges and investors in this 54-hour entrepreneurship competition.",
    date: "May 19-21, 2023",
    time: "5:00 PM Friday - 8:00 PM Sunday",
    location: "Business School, Innovation Lab",
    organizer: "Entrepreneurship Center",
    category: "Workshop",
    image: "/placeholder.svg?height=400&width=600&text=Startup",
    isVirtual: false,
    attendees: 75,
    capacity: 100,
    price: 25,
    createdBy: "user3",
    createdAt: "2023-04-05T15:30:00Z",
  },
  {
    id: "7",
    title: "Cultural Festival",
    description:
      "Celebrate diversity with performances, food, art, and activities representing cultures from around the world.",
    date: "May 27, 2023",
    time: "11:00 AM - 7:00 PM",
    location: "International Center",
    organizer: "International Student Association",
    category: "Social",
    image: "/placeholder.svg?height=400&width=600&text=Cultural+Festival",
    isVirtual: false,
    attendees: 410,
    price: 0,
    createdBy: "user1",
    createdAt: "2023-04-10T10:00:00Z",
  },
  {
    id: "8",
    title: "Virtual Study Group: Final Exam Prep",
    description:
      "Join peers online to review course material, share study strategies, and prepare for final exams in a collaborative environment.",
    date: "May 30, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "Zoom Meeting",
    organizer: "Academic Success Center",
    category: "Academic",
    image: "/placeholder.svg?height=400&width=600&text=Study+Group",
    isVirtual: true,
    attendees: 65,
    price: 0,
    createdBy: "user2",
    createdAt: "2023-04-15T16:45:00Z",
  },
]

// In a real app, this would be stored in a database
let userEvents = [...events]

export function getAllEvents(): Event[] {
  return userEvents
}

export function getEventById(id: string): Event | undefined {
  return userEvents.find((event) => event.id === id)
}

export function getEventsByCategory(category: string): Event[] {
  return userEvents.filter((event) => event.category.toLowerCase() === category.toLowerCase())
}

export function getUpcomingEvents(limit = 3): Event[] {
  // In a real app, you would filter by date
  return userEvents.slice(0, limit)
}

export function getEventsByUser(userId: string): Event[] {
  return userEvents.filter((event) => event.createdBy === userId)
}

// Create a new event
export function createEvent(eventData: Omit<Event, "id" | "attendees" | "createdAt">): Event {
  const newEvent: Event = {
    ...eventData,
    id: `${userEvents.length + 1}`,
    attendees: 0,
    createdAt: new Date().toISOString(),
  }

  userEvents = [...userEvents, newEvent]
  return newEvent
}

// Update an existing event
export function updateEvent(id: string, eventData: Partial<Event>): Event | null {
  const eventIndex = userEvents.findIndex((event) => event.id === id)

  if (eventIndex === -1) {
    return null
  }

  const updatedEvent = {
    ...userEvents[eventIndex],
    ...eventData,
    updatedAt: new Date().toISOString(),
  }

  userEvents = [...userEvents.slice(0, eventIndex), updatedEvent, ...userEvents.slice(eventIndex + 1)]

  return updatedEvent
}

// Delete an event
export function deleteEvent(id: string): boolean {
  const initialLength = userEvents.length
  userEvents = userEvents.filter((event) => event.id !== id)
  return userEvents.length < initialLength
}

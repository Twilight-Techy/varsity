import type { User } from "@/lib/types"

// Mock data for users available for messaging
const users: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    department: "Computer Science",
  },
  {
    id: "user2",
    name: "Morgan Smith",
    username: "msmith",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    department: "Engineering",
  },
  {
    id: "user3",
    name: "Taylor Wilson",
    username: "twilson",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    department: "Business",
  },
  {
    id: "user4",
    name: "Jordan Lee",
    username: "jlee",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    department: "Psychology",
  },
  {
    id: "user5",
    name: "Casey Brown",
    username: "cbrown",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    department: "Mathematics",
  },
  {
    id: "user6",
    name: "Professor Martinez",
    username: "pmartinez",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    department: "Computer Science",
  },
  {
    id: "user7",
    name: "Riley Davis",
    username: "rdavis",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    department: "Physics",
  },
  {
    id: "user8",
    name: "Quinn Thomas",
    username: "qthomas",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    department: "Chemistry",
  },
  {
    id: "user9",
    name: "Avery Miller",
    username: "amiller",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    department: "Biology",
  },
  {
    id: "user10",
    name: "Jamie Garcia",
    username: "jgarcia",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    department: "Art History",
  },
]

export function getUsersForMessaging(): User[] {
  return users
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

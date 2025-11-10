export interface Community {
  id: string
  name: string
  type: "university" | "faculty" | "department" | "level" | "other"
  description: string
  members: number
  avatar: string | null
  coverImage: string | null
  joined: boolean
  isAdmin: boolean
  createdAt: string
  activity: string
  privacy: string
  location?: string
  links?: { title: string; url: string }[]
  rules?: { title: string; description: string }[]
}

export interface Notification {
  id: string
  type: "mention" | "comment" | "academic" | "community" | "system"
  subtype?: string
  source: {
    name: string
    avatar: string | null
    role?: string
  }
  content: string
  timestamp: string
  read: boolean
  link: string
}

export interface CommunityMember {
  id: string
  communityId: string
  name: string
  avatar: string | null
  role: "Admin" | "Moderator" | "Student"
  joinedDate: string
}

export interface Post {
  id: number
  type: "assignment" | "question" | "announcement" | "post"
  author: {
    name: string
    avatar: string | null
    role: string
  }
  community: string
  communityId: string
  title: string
  content: string
  deadline: string | null
  attachments: number
  comments: number
  solutions: number
  createdAt: string
}

export interface Course {
  id: string
  code: string
  title: string
  department: string
  credits: number
  status: "active" | "completed" | "upcoming"
  description: string
  instructor: {
    name: string
    email: string
    office: string
    officeHours: string
  }
  schedule: {
    days: string[]
    time: string
    weeks: {
      week: number
      topic: string
      description: string
      readings?: string[]
    }[]
  }
  location: string
  students: number
  assignments: number
  objectives: string[]
  grading: {
    distribution: {
      category: string
      percentage: number
    }[]
    scale: {
      grade: string
      range: string
    }[]
  }
  policies: {
    title: string
    description: string
  }[]
  assignmentList: {
    id: string
    title: string
    description: string
    dueDate: string
    dueTime: string
    points: number
    status: "upcoming" | "completed" | "past-due"
  }[]
  discussions: {
    id: string
    title: string
    type: "announcement" | "question" | "general"
    author: {
      name: string
      role: string
    }
    date: string
    preview: string
    likes: number
    replies: number
  }[]
  resources: {
    title: string
    items: {
      title: string
      description: string
      type: string
      url: string
    }[]
  }[]
  textbooks: {
    title: string
    author: string
    publisher: string
    year: string
    isbn?: string
    required: boolean
    link?: string
  }[]
  participants: {
    id: string
    name: string
    email: string
    role: string
  }[]
}

export interface StudyGroup {
  id: string
  name: string
  description: string
  courseId: string | null
  course: string | null
  privacy: "public" | "private" | "course"
  meetingType: "in-person" | "online" | "hybrid"
  location: string | null
  meetingLink: string | null
  members: number
  maxMembers: number
  joined: boolean
  isCreator: boolean
  createdAt: string
  nextSession: string
  tags?: string[]
  goals?: string[]
  rules?: {
    title: string
    description: string
  }[]
  discussions?: {
    id: string
    author: {
      name: string
      role: string
    }
    date: string
    content: string
    replies: number
  }[]
  sessions?: {
    title: string
    date: string
    startTime: string
    endTime: string
    location: string | null
    description?: string
    meetingLink?: string | null
  }[]
  pastSessions?: {
    title: string
    date: string
    startTime: string
    endTime: string
    location: string | null
  }[]
  resources?: {
    title: string
    description: string
    url: string
    addedDate: string
  }[]
  membersList?: {
    name: string
    role: "creator" | "member"
    joinedDate: string
  }[]
  recommended: boolean
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    avatar: string | null
    isOnline: boolean
  }[]
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isGroup: boolean
  name?: string
}

export interface User {
  id: string
  name: string
  username: string
  avatar: string | null
  isOnline: boolean
  department: string
}

export interface Resource {
  id: string
  title: string
  description: string
  type: "notes" | "textbook" | "past-question" | "solution"
  course: string
  department: string
  level: string
  school: string
  uploader: {
    name: string
    avatar: string | null
    role?: string
  }
  uploadDate: string
  views: number
  downloads: number
  rating: number
  fileFormat: string
  fileSize: string
  pages?: number
  language?: string
  contents?: string[]
  tags?: string[]
  reviews?: {
    user: {
      name: string
      avatar: string | null
    }
    rating: number
    date: string
    comment: string
  }[]
  related?: {
    id: string
    title: string
    type: string
    course: string
  }[]
}

export type EventType = "academic" | "social" | "career" | "workshop" | "conference"
export type EventCategory = "technology" | "science" | "arts" | "business" | "health" | "sports"

export interface Event {
  id: string
  title: string
  description: string
  type: EventType
  category: EventCategory
  date: string
  location: string
  virtualLink?: string
  organizer: {
    name: string
    role: string
    avatar: string | null
    description?: string
  }
  attendees: number
  attendeesList?: {
    name: string
    role: string
    avatar: string | null
  }[]
  image: string | null
  isInterested?: boolean
  agenda?: string[]
  requirements?: string
  registrationLink?: string
  tags?: string[]
}

export interface MarketplaceCategory {
  id: string
  name: string
  icon: string
  count: number
}

export interface MarketplaceItem {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  condition: string
  images: string[]
  location: string
  seller: {
    id: string
    name: string
    avatar: string | null
    rating: number
    joinedDate: string
  }
  listedDate: string
  isNegotiable: boolean
  isSold: boolean
  isFeatured: boolean
  isBookmarked: boolean
  course?: string
  isbn?: string
  warranty?: string
}

import type { Conversation, Message } from "@/lib/types"

// Mock data for conversations
const conversations: Conversation[] = [
  {
    id: "conv1",
    participants: [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
    ],
    lastMessage: "Hey, did you finish the assignment?",
    lastMessageTime: "2023-04-20T14:30:00Z",
    unreadCount: 2,
    isGroup: false,
  },
  {
    id: "conv2",
    participants: [
      {
        id: "user2",
        name: "Morgan Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
    ],
    lastMessage: "Thanks for sharing your notes!",
    lastMessageTime: "2023-04-19T09:15:00Z",
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: "conv3",
    name: "CS 101 Study Group",
    participants: [
      {
        id: "user3",
        name: "Taylor Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      {
        id: "user4",
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
      {
        id: "user5",
        name: "Casey Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
    ],
    lastMessage: "Let's meet at the library at 6pm",
    lastMessageTime: "2023-04-18T18:45:00Z",
    unreadCount: 5,
    isGroup: true,
  },
  {
    id: "conv4",
    participants: [
      {
        id: "user6",
        name: "Professor Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
    ],
    lastMessage: "Office hours are canceled tomorrow",
    lastMessageTime: "2023-04-17T11:20:00Z",
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: "conv5",
    name: "Dorm Floor Chat",
    participants: [
      {
        id: "user7",
        name: "Riley Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      {
        id: "user8",
        name: "Quinn Thomas",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
      {
        id: "user9",
        name: "Avery Miller",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
      {
        id: "user10",
        name: "Jamie Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
    ],
    lastMessage: "Anyone want to order pizza tonight?",
    lastMessageTime: "2023-04-16T20:10:00Z",
    unreadCount: 1,
    isGroup: true,
  },
]

// Mock data for messages
const messages: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1",
      conversationId: "conv1",
      senderId: "user1",
      content: "Hey, how's your day going?",
      timestamp: "2023-04-20T14:15:00Z",
      read: true,
    },
    {
      id: "msg2",
      conversationId: "conv1",
      senderId: "current-user",
      content: "Pretty good! Working on that CS assignment.",
      timestamp: "2023-04-20T14:20:00Z",
      read: true,
    },
    {
      id: "msg3",
      conversationId: "conv1",
      senderId: "user1",
      content: "Oh nice! How far along are you?",
      timestamp: "2023-04-20T14:25:00Z",
      read: true,
    },
    {
      id: "msg4",
      conversationId: "conv1",
      senderId: "user1",
      content: "Did you finish the assignment?",
      timestamp: "2023-04-20T14:30:00Z",
      read: false,
    },
  ],
  conv2: [
    {
      id: "msg5",
      conversationId: "conv2",
      senderId: "current-user",
      content: "Hey Morgan, do you have the notes from yesterday's lecture?",
      timestamp: "2023-04-19T08:45:00Z",
      read: true,
    },
    {
      id: "msg6",
      conversationId: "conv2",
      senderId: "user2",
      content: "Yes, I do! Let me send them to you.",
      timestamp: "2023-04-19T09:00:00Z",
      read: true,
    },
    {
      id: "msg7",
      conversationId: "conv2",
      senderId: "user2",
      content: "[Attachment: Lecture_Notes.pdf]",
      timestamp: "2023-04-19T09:05:00Z",
      read: true,
    },
    {
      id: "msg8",
      conversationId: "conv2",
      senderId: "current-user",
      content: "Thanks for sharing your notes!",
      timestamp: "2023-04-19T09:15:00Z",
      read: true,
    },
  ],
  conv3: [
    {
      id: "msg9",
      conversationId: "conv3",
      senderId: "user3",
      content: "Hey everyone, should we meet up to study for the midterm?",
      timestamp: "2023-04-18T17:30:00Z",
      read: true,
    },
    {
      id: "msg10",
      conversationId: "conv3",
      senderId: "user4",
      content: "I'm free after 5pm tomorrow",
      timestamp: "2023-04-18T17:45:00Z",
      read: true,
    },
    {
      id: "msg11",
      conversationId: "conv3",
      senderId: "current-user",
      content: "That works for me too",
      timestamp: "2023-04-18T18:00:00Z",
      read: true,
    },
    {
      id: "msg12",
      conversationId: "conv3",
      senderId: "user5",
      content: "Same here. Where should we meet?",
      timestamp: "2023-04-18T18:15:00Z",
      read: true,
    },
    {
      id: "msg13",
      conversationId: "conv3",
      senderId: "user3",
      content: "How about the library?",
      timestamp: "2023-04-18T18:30:00Z",
      read: true,
    },
    {
      id: "msg14",
      conversationId: "conv3",
      senderId: "user3",
      content: "Let's meet at the library at 6pm",
      timestamp: "2023-04-18T18:45:00Z",
      read: false,
    },
  ],
  conv4: [
    {
      id: "msg15",
      conversationId: "conv4",
      senderId: "user6",
      content: "Hello students, I wanted to let you know about the upcoming project deadline.",
      timestamp: "2023-04-17T10:00:00Z",
      read: true,
    },
    {
      id: "msg16",
      conversationId: "conv4",
      senderId: "current-user",
      content: "Thank you for the reminder. Will you be available for questions during office hours tomorrow?",
      timestamp: "2023-04-17T10:30:00Z",
      read: true,
    },
    {
      id: "msg17",
      conversationId: "conv4",
      senderId: "user6",
      content: "Office hours are canceled tomorrow. I can answer questions via email instead.",
      timestamp: "2023-04-17T11:20:00Z",
      read: true,
    },
  ],
  conv5: [
    {
      id: "msg18",
      conversationId: "conv5",
      senderId: "user7",
      content: "Hey floor mates! How's everyone doing?",
      timestamp: "2023-04-16T19:00:00Z",
      read: true,
    },
    {
      id: "msg19",
      conversationId: "conv5",
      senderId: "user8",
      content: "Just finished my last class for the day!",
      timestamp: "2023-04-16T19:15:00Z",
      read: true,
    },
    {
      id: "msg20",
      conversationId: "conv5",
      senderId: "current-user",
      content: "I'm starving. Been studying all day.",
      timestamp: "2023-04-16T19:30:00Z",
      read: true,
    },
    {
      id: "msg21",
      conversationId: "conv5",
      senderId: "user9",
      content: "Same! Should we get food?",
      timestamp: "2023-04-16T19:45:00Z",
      read: true,
    },
    {
      id: "msg22",
      conversationId: "conv5",
      senderId: "user10",
      content: "Anyone want to order pizza tonight?",
      timestamp: "2023-04-16T20:10:00Z",
      read: false,
    },
  ],
}

// Helper functions to get data
export function getConversations(): Conversation[] {
  return conversations
}

export function getConversationById(id: string): Conversation | undefined {
  return conversations.find((conv) => conv.id === id)
}

export function getMessagesByConversationId(conversationId: string): Message[] {
  return messages[conversationId] || []
}

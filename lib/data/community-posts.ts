import type { Post } from "@/lib/types"

export const communityPosts: Post[] = [
  {
    id: 1,
    type: "assignment",
    author: {
      name: "Dr. Adebayo",
      avatar: null,
      role: "Lecturer",
    },
    community: "Computer Science",
    communityId: "compsci",
    title: "Data Structures Assignment",
    content:
      "Implement a balanced binary search tree with insertion, deletion, and traversal methods. Submit your code and a brief report explaining your implementation.",
    deadline: "2023-06-15T23:59:59",
    attachments: 1,
    comments: 8,
    solutions: 3,
    createdAt: "2023-06-01T10:30:00",
  },
  {
    id: 2,
    type: "question",
    author: {
      name: "Chioma Okafor",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
      role: "Student",
    },
    community: "Computer Science",
    communityId: "compsci",
    title: "Help with Recursion",
    content:
      "I'm struggling to understand how recursion works in the context of tree traversal. Can someone explain with a simple example?",
    deadline: null,
    attachments: 0,
    comments: 12,
    solutions: 5,
    createdAt: "2023-06-02T14:20:00",
  },
  {
    id: 3,
    type: "announcement",
    author: {
      name: "Faculty Admin",
      avatar: null,
      role: "Admin",
    },
    community: "Faculty of Engineering",
    communityId: "engineering",
    title: "Upcoming Faculty Meeting",
    content:
      "There will be a faculty-wide meeting on Friday, June 10th at 2:00 PM in the Main Auditorium. All students and staff are encouraged to attend as we'll be discussing important changes to the curriculum.",
    deadline: null,
    attachments: 1,
    comments: 3,
    solutions: 0,
    createdAt: "2023-06-03T09:15:00",
  },
  {
    id: 4,
    type: "assignment",
    author: {
      name: "Prof. Okonkwo",
      avatar: null,
      role: "Lecturer",
    },
    community: "Computer Science",
    communityId: "compsci",
    title: "SQL Database Project",
    content:
      "Design and implement a database for a university management system. Your database should include tables for students, courses, lecturers, and grades. Submit your SQL scripts and an ER diagram.",
    deadline: "2023-06-20T23:59:59",
    attachments: 2,
    comments: 5,
    solutions: 0,
    createdAt: "2023-06-04T11:45:00",
  },
  {
    id: 5,
    type: "announcement",
    author: {
      name: "University Admin",
      avatar: null,
      role: "Admin",
    },
    community: "University of Lagos",
    communityId: "unilag",
    title: "Campus-Wide Internet Upgrade",
    content:
      "We're pleased to announce that the campus-wide internet infrastructure upgrade will begin next week. Expect improved Wi-Fi coverage and faster speeds across all buildings. There may be brief outages during the transition.",
    deadline: null,
    attachments: 0,
    comments: 15,
    solutions: 0,
    createdAt: "2023-06-05T08:30:00",
  },
  {
    id: 6,
    type: "question",
    author: {
      name: "Emeka Eze",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      role: "Student",
    },
    community: "300 Level",
    communityId: "level300",
    title: "Internship Application Tips",
    content:
      "Has anyone successfully applied for the summer internship program at Tech Solutions Nigeria? I'm preparing my application and would appreciate any tips or advice on the interview process.",
    deadline: null,
    attachments: 0,
    comments: 7,
    solutions: 3,
    createdAt: "2023-06-06T16:45:00",
  },
]

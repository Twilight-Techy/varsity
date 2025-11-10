import type { Notification } from "@/lib/types"

export function getAllNotifications(): Notification[] {
  return [
    {
      id: "notif-1",
      type: "academic",
      subtype: "assignment",
      source: {
        name: "Computer Science 301",
        avatar: null,
        role: "Course",
      },
      content: "New assignment posted: 'Database Design Project'. Due in 5 days.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false,
      link: "/courses/cs301/assignments/db-design",
    },
    {
      id: "notif-2",
      type: "comment",
      source: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: "Commented on your post: 'This solution worked perfectly for me. Thanks for sharing!'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: false,
      link: "/posts/123#comment-456",
    },
    {
      id: "notif-3",
      type: "academic",
      subtype: "class",
      source: {
        name: "Data Structures",
        avatar: null,
        role: "Course",
      },
      content: "Reminder: Class starts in 30 minutes in Room 401, CS Building.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      read: true,
      link: "/schedule",
    },
    {
      id: "notif-4",
      type: "mention",
      source: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Teaching Assistant",
      },
      content: "Mentioned you in a comment: '@username can you explain your approach to this problem?'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      read: true,
      link: "/posts/789#comment-101",
    },
    {
      id: "notif-5",
      type: "community",
      subtype: "join",
      source: {
        name: "Machine Learning Club",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Your request to join has been approved. Welcome to the community!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
      read: false,
      link: "/communities/ml-club",
    },
    {
      id: "notif-6",
      type: "academic",
      subtype: "grade",
      source: {
        name: "Algorithms 202",
        avatar: null,
        role: "Course",
      },
      content: "Your midterm exam has been graded. You received an A-.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      read: true,
      link: "/courses/algo202/grades",
    },
    {
      id: "notif-7",
      type: "system",
      source: {
        name: "Varsity",
        avatar: null,
      },
      content: "Your account settings were updated successfully.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      read: true,
      link: "/settings",
    },
    {
      id: "notif-8",
      type: "comment",
      source: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: "Replied to your comment: 'I'll share my notes from the lecture with you.'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 30).toISOString(), // 2 days and 30 minutes ago
      read: false,
      link: "/posts/456#comment-789",
    },
    {
      id: "notif-9",
      type: "academic",
      subtype: "assignment",
      source: {
        name: "Physics 101",
        avatar: null,
        role: "Course",
      },
      content: "Assignment deadline extended: 'Wave Mechanics Problem Set' is now due in 7 days.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      read: true,
      link: "/courses/phys101/assignments/wave-mechanics",
    },
    {
      id: "notif-10",
      type: "community",
      subtype: "post",
      source: {
        name: "Computer Science Department",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "New announcement: 'Summer Internship Opportunities with Tech Partners'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 60 * 2).toISOString(), // 3 days and 2 hours ago
      read: true,
      link: "/communities/cs-dept/posts/internships",
    },
    {
      id: "notif-11",
      type: "mention",
      source: {
        name: "Professor Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Professor",
      },
      content: "Mentioned you in a post: 'Congratulations to @username for the excellent presentation today.'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
      read: true,
      link: "/posts/234",
    },
    {
      id: "notif-12",
      type: "system",
      subtype: "update",
      source: {
        name: "Varsity",
        avatar: null,
      },
      content: "New feature: You can now create study groups with your classmates.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      read: true,
      link: "/study-groups",
    },
    {
      id: "notif-13",
      type: "academic",
      subtype: "grade",
      source: {
        name: "Software Engineering 401",
        avatar: null,
        role: "Course",
      },
      content: "Your team project has been graded. Your team received an A.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(), // 6 days ago
      read: true,
      link: "/courses/se401/grades",
    },
    {
      id: "notif-14",
      type: "comment",
      source: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: "Liked your solution to the algorithm problem.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
      read: true,
      link: "/posts/567#solution-123",
    },
    {
      id: "notif-15",
      type: "community",
      subtype: "join",
      source: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: "Joined your study group for Calculus II.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), // 8 days ago
      read: true,
      link: "/study-groups/calc2",
    },
  ]
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "./post-card"

// Sample post data
const posts = [
  {
    id: 1,
    type: "assignment",
    author: {
      name: "Dr. Adebayo",
      avatar: null,
      role: "Lecturer",
    },
    community: "Computer Science 301",
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
    community: "Database Systems",
    title: "SQL Database Project",
    content:
      "Design and implement a database for a university management system. Your database should include tables for students, courses, lecturers, and grades. Submit your SQL scripts and an ER diagram.",
    deadline: "2023-06-20T23:59:59",
    attachments: 2,
    comments: 5,
    solutions: 0,
    createdAt: "2023-06-04T11:45:00",
  },
]

export default function PostFeed() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-6 mt-6">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-1">
          <TabsList className="w-full grid grid-cols-4 bg-transparent h-auto p-0">
            <TabsTrigger
              value="all"
              className={`rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm`}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className={`rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm`}
            >
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="questions"
              className={`rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm`}
            >
              Questions
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className={`rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm`}
            >
              Announcements
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6 space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="mt-6 space-y-4">
          {posts
            .filter((post) => post.type === "assignment")
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
        </TabsContent>

        <TabsContent value="questions" className="mt-6 space-y-4">
          {posts
            .filter((post) => post.type === "question")
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
        </TabsContent>

        <TabsContent value="announcements" className="mt-6 space-y-4">
          {posts
            .filter((post) => post.type === "announcement")
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="border-blue-500/30 text-blue-500 hover:bg-blue-500/10 bg-gradient-to-r from-blue-600/5 to-purple-600/5"
        >
          Load More Posts
        </Button>
      </div>
    </div>
  )
}

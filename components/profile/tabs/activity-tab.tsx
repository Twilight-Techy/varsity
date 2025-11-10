"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/components/dashboard/post-card"

// Sample activity data
const userPosts = [
  {
    id: 101,
    type: "question",
    author: {
      name: "John Doe",
      avatar: null,
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
    id: 102,
    type: "assignment",
    author: {
      name: "John Doe",
      avatar: null,
      role: "Student",
    },
    community: "Database Systems",
    title: "My SQL Database Project",
    content:
      "I've completed my database project for the university management system. Check it out and let me know your thoughts!",
    deadline: null,
    attachments: 2,
    comments: 5,
    solutions: 0,
    createdAt: "2023-06-04T11:45:00",
  },
]

const userComments = [
  {
    id: 201,
    postId: 301,
    postTitle: "Data Structures Assignment",
    content: "Thanks for the detailed explanation! This really helped me understand AVL trees better.",
    createdAt: "2023-06-05T15:20:00",
  },
  {
    id: 202,
    postId: 302,
    postTitle: "Upcoming Faculty Meeting",
    content: "Will the meeting be recorded for those who can't attend in person?",
    createdAt: "2023-06-03T10:05:00",
  },
]

const userSolutions = [
  {
    id: 301,
    postId: 401,
    postTitle: "Algorithm Complexity Analysis",
    content: "Here's my solution to the time complexity analysis problem...",
    approved: true,
    createdAt: "2023-06-07T09:30:00",
  },
]

interface User {
  id: string
  name: string
  [key: string]: any
}

interface ActivityTabProps {
  user: User
}

export default function ActivityTab({ user }: ActivityTabProps) {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div>
      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No posts yet</h3>
              <p className="text-foreground/70">{user.name} hasn't created any posts yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          {userComments.length > 0 ? (
            userComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-4"
              >
                <h3 className="font-medium mb-1">
                  <a href={`/posts/${comment.postId}`} className="hover:text-blue-500 transition-colors">
                    {comment.postTitle}
                  </a>
                </h3>
                <p className="text-sm text-foreground/80 mb-2">{comment.content}</p>
                <div className="text-xs text-foreground/60">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No comments yet</h3>
              <p className="text-foreground/70">{user.name} hasn't commented on any posts yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="solutions" className="space-y-4">
          {userSolutions.length > 0 ? (
            userSolutions.map((solution) => (
              <div
                key={solution.id}
                className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">
                    <a href={`/posts/${solution.postId}`} className="hover:text-blue-500 transition-colors">
                      {solution.postTitle}
                    </a>
                  </h3>
                  {solution.approved && (
                    <div className="px-2 py-1 bg-green-600/10 text-green-500 text-xs font-medium rounded-full">
                      Approved
                    </div>
                  )}
                </div>
                <p className="text-sm text-foreground/80 mb-2">{solution.content}</p>
                <div className="text-xs text-foreground/60">
                  {new Date(solution.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No solutions yet</h3>
              <p className="text-foreground/70">{user.name} hasn't submitted any solutions yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

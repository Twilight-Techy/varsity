"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import CommentCard from "./comment-card"
import SolutionCard from "./solution-card"

// Sample comments data
const comments = [
  {
    id: 1,
    author: {
      name: "Emeka Eze",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      role: "Student",
    },
    content:
      "I'm having trouble understanding how to implement the balancing part of the tree. Does anyone have any resources that explain AVL or Red-Black trees in a simple way?",
    createdAt: "2023-06-02T15:30:00",
    likes: 5,
    replies: [
      {
        id: 101,
        author: {
          name: "Amina Ibrahim",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          role: "Student",
        },
        content:
          "I found this tutorial really helpful: [link]. It has step-by-step explanations with visualizations that make it easier to understand the rotations.",
        createdAt: "2023-06-02T16:15:00",
        likes: 3,
      },
      {
        id: 102,
        author: {
          name: "Dr. Adebayo",
          avatar: null,
          role: "Lecturer",
        },
        content:
          "Check the lecture notes from week 5, where we covered balancing algorithms in detail. I've also uploaded some additional resources to the course materials section.",
        createdAt: "2023-06-02T17:45:00",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Tunde Bakare",
      avatar: null,
      role: "Student",
    },
    content: "Is this assignment to be done individually or can we work in pairs?",
    createdAt: "2023-06-03T09:20:00",
    likes: 2,
    replies: [
      {
        id: 201,
        author: {
          name: "Dr. Adebayo",
          avatar: null,
          role: "Lecturer",
        },
        content: "This is an individual assignment. Each student should submit their own work.",
        createdAt: "2023-06-03T10:05:00",
        likes: 4,
      },
    ],
  },
]

// Sample solutions data
const solutions = [
  {
    id: 1,
    author: {
      name: "John Doe",
      avatar: null,
      role: "Student",
    },
    content: `
      <p>Here's my implementation of a balanced binary search tree using AVL tree algorithm:</p>
      
      <pre><code>
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def getHeight(self, root):
        if not root:
            return 0
        return root.height
        
    def getBalance(self, root):
        if not root:
            return 0
        return self.getHeight(root.left) - self.getHeight(root.right)
        
    def insert(self, root, key):
        # Standard BST insert
        if not root:
            return Node(key)
            
        if key < root.key:
            root.left = self.insert(root.left, key)
        else:
            root.right = self.insert(root.right, key)
            
        # Update height
        root.height = 1 + max(self.getHeight(root.left), self.getHeight(root.right))
        
        # Get balance factor
        balance = self.getBalance(root)
        
        # Perform rotations if needed
        # Left Left Case
        if balance > 1 and key < root.left.key:
            return self.rightRotate(root)
            
        # Right Right Case
        if balance < -1 and key > root.right.key:
            return self.leftRotate(root)
            
        # Left Right Case
        if balance > 1 and key > root.left.key:
            root.left = self.leftRotate(root.left)
            return self.rightRotate(root)
            
        # Right Left Case
        if balance < -1 and key < root.right.key:
            root.right = self.rightRotate(root.right)
            return self.leftRotate(root)
            
        return root
      </code></pre>
      
      <p>The time complexity for insertion, deletion, and search operations is O(log n) in the average case, where n is the number of nodes in the tree.</p>
    `,
    createdAt: "2023-06-05T14:30:00",
    likes: 12,
    approved: false,
    comments: [
      {
        id: 301,
        author: {
          name: "Chioma Okafor",
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
          role: "Student",
        },
        content: "This is really well-explained! I especially like how you've handled the rotation cases.",
        createdAt: "2023-06-05T15:20:00",
        likes: 2,
      },
    ],
  },
]

interface CommentSectionProps {
  postId: number
  postType: string
}

export default function CommentSection({ postId, postType }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [activeTab, setActiveTab] = useState(postType === "assignment" ? "solutions" : "comments")

  const handleSubmitComment = () => {
    // In a real app, this would send the comment to the server
    console.log("Submitting comment:", commentText)
    setCommentText("")
  }

  return (
    <div className="space-y-6">
      {postType === "assignment" ? (
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-1 mb-6">
            <TabsList className="w-full grid grid-cols-2 bg-transparent h-auto p-0">
              <TabsTrigger
                value="solutions"
                className={`rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm`}
              >
                <ThumbsUp className="h-4 w-4 mr-2" /> Solutions ({solutions.length})
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className={`rounded-lg py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:text-foreground data-[state=active]:shadow-sm`}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Comments ({comments.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="solutions" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Submit Your Solution</h3>
              <Textarea
                placeholder="Share your solution to this assignment..."
                className="min-h-[150px] mb-4"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleSubmitComment}
                >
                  Submit Solution
                </Button>
              </div>
            </motion.div>

            <div className="space-y-4">
              {solutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
              <Textarea
                placeholder="Add your comment..."
                className="min-h-[100px] mb-4"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleSubmitComment}
                >
                  Post Comment
                </Button>
              </div>
            </motion.div>

            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
            <Textarea
              placeholder="Add your comment..."
              className="min-h-[100px] mb-4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleSubmitComment}
              >
                Post Comment
              </Button>
            </div>
          </motion.div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

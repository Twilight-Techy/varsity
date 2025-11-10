"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, FileText, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample related posts
const relatedPosts = [
  {
    id: 3,
    title: "Understanding Binary Search Trees",
    type: "post",
    community: "Computer Science 301",
    author: "Dr. Adebayo",
    comments: 15,
  },
  {
    id: 4,
    title: "Algorithm Complexity Analysis",
    type: "assignment",
    community: "Computer Science 301",
    author: "Dr. Adebayo",
    comments: 8,
  },
  {
    id: 5,
    title: "Help with tree traversal algorithms",
    type: "question",
    community: "Computer Science",
    author: "Tunde Bakare",
    comments: 12,
  },
]

// Sample community info
const communityInfo = {
  name: "Computer Science 301",
  description: "Advanced data structures and algorithms for third-year computer science students.",
  members: 320,
  posts: 156,
  image: null,
}

interface RelatedSidebarProps {
  community: string
  postType: string
  currentPostId: number
}

export default function RelatedSidebar({ community, postType, currentPostId }: RelatedSidebarProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "question":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "post":
      case "announcement":
        return <BookOpen className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Community Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg"
      >
        <div className="h-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative">
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <div className="p-4 -mt-10 relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-2 mx-auto border-4 border-background">
            {communityInfo.name.charAt(0)}
          </div>
          <h2 className="text-center font-semibold mb-1">{communityInfo.name}</h2>
          <p className="text-center text-sm text-foreground/70 mb-4">{communityInfo.description}</p>
          <div className="flex justify-center gap-6 text-sm text-foreground/70 mb-4">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-foreground">{communityInfo.members}</span>
              <span>Members</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-foreground">{communityInfo.posts}</span>
              <span>Posts</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10"
            asChild
          >
            <Link href={`/communities/${community}`}>
              <Users className="mr-2 h-4 w-4" />
              View Community
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Related Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg"
      >
        <div className="p-4 border-b border-foreground/10">
          <h2 className="font-semibold">Related Posts</h2>
        </div>
        <div className="p-4 space-y-4">
          {relatedPosts
            .filter((post) => post.id !== currentPostId)
            .map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className="block group">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getTypeIcon(post.type)}</div>
                  <div>
                    <h3 className="font-medium text-sm group-hover:text-blue-500 transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-foreground/70 mt-1">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="p-4 border-t border-foreground/10">
          <Button variant="ghost" size="sm" className="w-full text-blue-500 hover:text-blue-600 font-medium" asChild>
            <Link href={`/communities/${community}`}>View More Posts</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

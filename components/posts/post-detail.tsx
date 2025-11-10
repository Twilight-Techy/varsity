"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { BookOpen, Calendar, Download, FileText, MessageSquare, PaperclipIcon, Share2, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Author {
  name: string
  avatar: string | null
  role: string
}

interface Attachment {
  name: string
  size: string
  type: string
}

interface Post {
  id: number
  type: "assignment" | "question" | "announcement"
  author: Author
  community: string
  title: string
  content: string
  deadline: string | null
  attachments: Attachment[]
  comments: number
  solutions: number
  createdAt: string
}

interface PostDetailProps {
  post: Post
}

export default function PostDetail({ post }: PostDetailProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "question":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "announcement":
        return <BookOpen className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-blue-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
      case "question":
        return "bg-purple-600/10 text-purple-500 border-purple-500/20"
      case "announcement":
        return "bg-green-600/10 text-green-500 border-green-500/20"
      default:
        return "bg-blue-600/10 text-blue-500 border-blue-500/20"
    }
  }

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden shadow-lg mb-6"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                post.author.name.charAt(0) + (post.author.name.split(" ")[1]?.charAt(0) || "")
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{post.author.name}</h3>
                <span className="text-xs text-foreground/60">•</span>
                <span className="text-xs text-foreground/60">{post.author.role}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/70">
                <Link href={`/communities/${post.community}`} className="hover:text-blue-500 transition-colors">
                  {post.community}
                </Link>
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className={`${getTypeColor(post.type)}`}>
            <div className="flex items-center gap-1">
              {getTypeIcon(post.type)}
              <span className="capitalize">{post.type}</span>
            </div>
          </Badge>
        </div>

        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

        <div className="prose dark:prose-invert max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.deadline && (
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Deadline:</span>
              <span className="text-sm">
                {new Date(post.deadline).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        )}

        {post.attachments && post.attachments.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Attachments</h3>
            <div className="space-y-2">
              {post.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
                      <PaperclipIcon className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-foreground/70">{attachment.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-foreground/10">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground/70">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments} Comments</span>
            </div>
            {post.solutions > 0 && (
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.solutions} Solutions</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

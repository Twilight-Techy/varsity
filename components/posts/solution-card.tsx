"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle, MessageSquare, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Author {
  name: string
  avatar: string | null
  role: string
}

interface Comment {
  id: number
  author: Author
  content: string
  createdAt: string
  likes: number
}

interface Solution {
  id: number
  author: Author
  content: string
  createdAt: string
  likes: number
  approved: boolean
  comments: Comment[]
}

interface SolutionCardProps {
  solution: Solution
}

export default function SolutionCard({ solution }: SolutionCardProps) {
  const [isCommenting, setIsCommenting] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(solution.likes)

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleSubmitComment = () => {
    // In a real app, this would send the comment to the server
    console.log("Submitting comment:", commentText)
    setCommentText("")
    setIsCommenting(false)
  }

  return (
    <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {solution.author.avatar ? (
                <img
                  src={solution.author.avatar || "/placeholder.svg"}
                  alt={solution.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                solution.author.name.charAt(0) + (solution.author.name.split(" ")[1]?.charAt(0) || "")
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{solution.author.name}</h3>
                <span className="text-xs text-foreground/60">•</span>
                <span className="text-xs text-foreground/60">{solution.author.role}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/70">
                <span>{formatDate(solution.createdAt)}</span>
              </div>
            </div>
          </div>
          {solution.approved ? (
            <Badge variant="outline" className="bg-green-600/10 text-green-500 border-green-500/20">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Approved</span>
              </div>
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-blue-600/10 text-blue-500 border-blue-500/20">
              <div className="flex items-center gap-1">
                <span>Solution</span>
              </div>
            </Badge>
          )}
        </div>

        <div
          className="prose dark:prose-invert max-w-none mb-4 text-sm"
          dangerouslySetInnerHTML={{ __html: solution.content }}
        />

        <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 ${liked ? "text-blue-500" : "text-foreground/70"}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-foreground/70"
              onClick={() => setIsCommenting(!isCommenting)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Comment</span>
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-500 border-blue-500/20 hover:bg-blue-500/10"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </Button>
        </div>

        {isCommenting && (
          <div className="mt-4 space-y-3">
            <Textarea
              placeholder="Write your comment..."
              className="min-h-[80px]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsCommenting(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleSubmitComment}
              >
                Post Comment
              </Button>
            </div>
          </div>
        )}

        {showComments && solution.comments.length > 0 && (
          <div className="mt-4 space-y-3 pt-4 border-t border-foreground/10">
            <h4 className="text-sm font-medium">Comments</h4>
            {solution.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {comment.author.avatar ? (
                    <img
                      src={comment.author.avatar || "/placeholder.svg"}
                      alt={comment.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    comment.author.name.charAt(0) + (comment.author.name.split(" ")[1]?.charAt(0) || "")
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{comment.author.name}</h3>
                    <span className="text-xs text-foreground/60">•</span>
                    <span className="text-xs text-foreground/60">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

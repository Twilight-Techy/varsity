"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Author {
  name: string
  avatar: string | null
  role: string
}

interface Reply {
  id: number
  author: Author
  content: string
  createdAt: string
  likes: number
}

interface Comment {
  id: number
  author: Author
  content: string
  createdAt: string
  likes: number
  replies?: Reply[]
}

interface CommentCardProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [showReplies, setShowReplies] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)

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

  const handleSubmitReply = () => {
    // In a real app, this would send the reply to the server
    console.log("Submitting reply:", replyText)
    setReplyText("")
    setIsReplying(false)
  }

  return (
    <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
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
              <span className="text-xs text-foreground/60">{comment.author.role}</span>
              <span className="text-xs text-foreground/60">•</span>
              <span className="text-xs text-foreground/60">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-sm mb-3">{comment.content}</p>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 text-xs ${liked ? "text-blue-500" : "text-foreground/70"}`}
                onClick={handleLike}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{likeCount}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-foreground/70"
                onClick={() => setIsReplying(!isReplying)}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Reply</span>
              </Button>
            </div>

            {isReplying && (
              <div className="mt-3 space-y-3">
                <Textarea
                  placeholder="Write your reply..."
                  className="min-h-[80px] text-sm"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsReplying(false)}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={handleSubmitReply}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-500 mb-2"
                  onClick={() => setShowReplies(!showReplies)}
                >
                  {showReplies ? "Hide Replies" : "Show Replies"}
                </Button>
                {showReplies && (
                  <div className="space-y-3 pl-6 border-l-2 border-foreground/10">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="pt-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {reply.author.avatar ? (
                              <img
                                src={reply.author.avatar || "/placeholder.svg"}
                                alt={reply.author.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              reply.author.name.charAt(0) + (reply.author.name.split(" ")[1]?.charAt(0) || "")
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-sm">{reply.author.name}</h3>
                              <span className="text-xs text-foreground/60">•</span>
                              <span className="text-xs text-foreground/60">{reply.author.role}</span>
                              <span className="text-xs text-foreground/60">•</span>
                              <span className="text-xs text-foreground/60">{formatDate(reply.createdAt)}</span>
                            </div>
                            <p className="text-sm mb-2">{reply.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-xs text-foreground/70"
                              onClick={handleLike}
                            >
                              <ThumbsUp className="h-3.5 w-3.5" />
                              <span>{reply.likes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

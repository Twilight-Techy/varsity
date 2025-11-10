import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { BookOpen, Calendar, FileText, MessageSquare, PaperclipIcon, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Author {
  name: string
  avatar: string | null
  role: string
}

interface Post {
  id: number
  type: "assignment" | "question" | "announcement"
  author: Author
  community: string
  title: string
  content: string
  deadline: string | null
  attachments: number
  comments: number
  solutions: number
  createdAt: string
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
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
    <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-xl border border-foreground/10 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
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

        <Link href={`/posts/${post.id}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-500 transition-colors">{post.title}</h2>
        </Link>
        <p className="text-foreground/80 mb-4">{post.content}</p>

        {post.deadline && (
          <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
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

        <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-foreground/10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-foreground/70 text-sm">
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments} Comments</span>
            </div>
            {post.solutions > 0 && (
              <div className="flex items-center gap-1 text-foreground/70 text-sm">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.solutions} Solutions</span>
              </div>
            )}
            {post.attachments > 0 && (
              <div className="flex items-center gap-1 text-foreground/70 text-sm">
                <PaperclipIcon className="h-4 w-4" />
                <span>{post.attachments} Attachments</span>
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10" asChild>
            <Link href={`/posts/${post.id}`}>View Post</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

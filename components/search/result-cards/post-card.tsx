import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, ThumbsUp } from "lucide-react"

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    author: {
      name: string
      username: string
      avatar: string
    }
    community: {
      name: string
      slug: string
    }
    createdAt: string
    likes: number
    comments: number
  }
}

export function PostCard({ post }: PostCardProps) {
  const createdAt = new Date(post.createdAt)
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:border-blue-500/50 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <Link href={`/profile/${post.author.username}`} className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            {post.author.name.charAt(0)}
          </div>
        </Link>

        <div>
          <div className="flex items-center gap-2">
            <Link href={`/profile/${post.author.username}`} className="font-medium hover:underline">
              {post.author.name}
            </Link>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            in{" "}
            <Link href={`/communities/${post.community.slug}`} className="hover:underline">
              {post.community.name}
            </Link>
          </div>
        </div>
      </div>

      <Link href={`/posts/${post.id}`} className="block">
        <h3 className="font-semibold text-base mb-2 hover:underline">{post.title}</h3>
        <p className="text-sm line-clamp-3">{post.content}</p>
      </Link>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ThumbsUp className="h-4 w-4" />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  )
}

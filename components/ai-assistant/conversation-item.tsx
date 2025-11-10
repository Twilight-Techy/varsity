"use client"

import { MessageSquare, BookOpen, GraduationCap, Bookmark, BookmarkCheck } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  title: string
  preview: string
  date: string
  category: "homework" | "concept" | "exam"
}

interface ConversationItemProps {
  conversation: Conversation
}

export default function ConversationItem({ conversation }: ConversationItemProps) {
  const [saved, setSaved] = useState(false)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "homework":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "concept":
        return <BookOpen className="h-4 w-4 text-purple-500" />
      case "exam":
        return <GraduationCap className="h-4 w-4 text-green-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div
      className={cn(
        "p-3 rounded-lg hover:bg-foreground/5 cursor-pointer transition-colors group relative",
        "border border-foreground/10 hover:border-foreground/20",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">{getCategoryIcon(conversation.category)}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{conversation.title}</h3>
          <p className="text-xs text-foreground/60 truncate">{conversation.preview}</p>
          <p className="text-xs text-foreground/60 mt-1">{conversation.date}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
        onClick={(e) => {
          e.stopPropagation()
          setSaved(!saved)
        }}
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4 text-blue-500" />
        ) : (
          <Bookmark className="h-4 w-4 text-foreground/60" />
        )}
      </Button>
    </div>
  )
}

"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Conversation } from "@/lib/types"

interface ConversationListProps {
  conversations: Conversation[]
  selectedId?: string
  onSelectConversation?: () => void
}

export default function ConversationList({ conversations, selectedId, onSelectConversation }: ConversationListProps) {
  return (
    <div className="divide-y divide-border">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/messages/${conversation.id}`}
          onClick={onSelectConversation}
          className={`block p-4 hover:bg-accent/50 transition-colors ${
            selectedId === conversation.id ? "bg-accent" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              {conversation.isGroup ? (
                <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">{conversation.participants.length}</span>
                </div>
              ) : (
                <>
                  <AvatarImage
                    src={conversation.participants[0].avatar || "/placeholder.svg"}
                    alt={conversation.participants[0].name}
                  />
                  <AvatarFallback>{conversation.participants[0].name.charAt(0)}</AvatarFallback>
                </>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium truncate">
                  {conversation.isGroup ? conversation.name : conversation.participants[0].name}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
              <div className="flex items-center mt-1">
                {conversation.unreadCount > 0 && (
                  <Badge variant="default" className="rounded-full px-2 py-0.5 text-xs">
                    {conversation.unreadCount}
                  </Badge>
                )}
                {conversation.participants.some((p) => p.isOnline) && (
                  <span className="ml-auto flex items-center text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    Online
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, MoreVertical, Paperclip, Send, ImageIcon, Smile } from "lucide-react"
import MessageBubble from "./message-bubble"
import { getConversationById, getMessagesByConversationId } from "@/lib/data/conversations"

interface ChatWindowProps {
  conversationId: string
  onBack?: () => void
}

export default function ChatWindow({ conversationId, onBack }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const conversation = getConversationById(conversationId)
  const messages = getMessagesByConversationId(conversationId)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // In a real app, this would send the message to the server
    console.log("Sending message:", newMessage)

    // Clear input
    setNewMessage("")
  }

  if (!conversation) return null

  const isGroup = conversation.isGroup
  const recipient = isGroup ? null : conversation.participants[0]

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-border flex items-center">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <Avatar className="h-9 w-9 mr-3">
          {isGroup ? (
            <div className="bg-primary/10 h-full w-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary">{conversation.participants.length}</span>
            </div>
          ) : (
            <>
              <AvatarImage src={recipient?.avatar || "/placeholder.svg"} alt={recipient?.name} />
              <AvatarFallback>{recipient?.name.charAt(0)}</AvatarFallback>
            </>
          )}
        </Avatar>

        <div className="flex-1">
          <h2 className="font-medium">{isGroup ? conversation.name : recipient?.name}</h2>
          {!isGroup && recipient?.isOnline && (
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
              Online
            </p>
          )}
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isOwnMessage={message.senderId === "current-user"} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send image</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <Smile className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add emoji</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            type="submit"
            size="icon"
            disabled={!newMessage.trim()}
            className={!newMessage.trim() ? "opacity-50" : ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

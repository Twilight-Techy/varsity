"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ConversationList from "./conversation-list"
import ChatWindow from "./chat-window"
import NewMessageButton from "./new-message-button"
import EmptyState from "./empty-state"
import { getConversations } from "@/lib/data/conversations"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function MessagesLayout({
  selectedConversationId,
}: {
  selectedConversationId?: string
}) {
  const conversations = getConversations()
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showConversationList, setShowConversationList] = useState(!isMobile || !selectedConversationId)
  const [showChatWindow, setShowChatWindow] = useState(!isMobile || !!selectedConversationId)

  // Handle responsive layout
  useEffect(() => {
    if (isMobile) {
      setShowConversationList(!selectedConversationId)
      setShowChatWindow(!!selectedConversationId)
    } else {
      setShowConversationList(true)
      setShowChatWindow(true)
    }
  }, [isMobile, selectedConversationId])

  // Handle back button on mobile
  const handleBackToList = () => {
    setShowConversationList(true)
    setShowChatWindow(false)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List */}
        {showConversationList && (
          <div
            className={`${isMobile && showChatWindow ? "hidden" : "flex"} flex-col w-full md:w-80 border-r border-border`}
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h1 className="text-xl font-bold">Messages</h1>
              <NewMessageButton />
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length > 0 ? (
                <ConversationList
                  conversations={conversations}
                  selectedId={selectedConversationId}
                  onSelectConversation={() => {
                    if (isMobile) {
                      setShowConversationList(false)
                      setShowChatWindow(true)
                    }
                  }}
                />
              ) : (
                <div className="p-4 text-center text-muted-foreground">No conversations yet</div>
              )}
            </div>
          </div>
        )}

        {/* Chat Window */}
        {showChatWindow && (
          <div className="flex-1 flex flex-col">
            {selectedConversationId ? (
              <ChatWindow conversationId={selectedConversationId} onBack={isMobile ? handleBackToList : undefined} />
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

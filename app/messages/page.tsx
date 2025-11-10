import { redirect } from "next/navigation"
import MessagesLayout from "@/components/messages/messages-layout"
import { getConversations } from "@/lib/data/conversations"

export default function MessagesPage() {
  const conversations = getConversations()

  // If there are conversations, redirect to the first one
  if (conversations.length > 0) {
    redirect(`/messages/${conversations[0].id}`)
  }

  // Otherwise show empty state
  return <MessagesLayout />
}

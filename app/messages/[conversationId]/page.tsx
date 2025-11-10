import { notFound } from "next/navigation"
import MessagesLayout from "@/components/messages/messages-layout"
import { getConversationById } from "@/lib/data/conversations"

export default function ConversationPage({
  params,
}: {
  params: { conversationId: string }
}) {
  const conversation = getConversationById(params.conversationId)

  if (!conversation) {
    notFound()
  }

  return <MessagesLayout selectedConversationId={params.conversationId} />
}

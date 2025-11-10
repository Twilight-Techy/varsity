import { formatDistanceToNow } from "date-fns"
import { Check, CheckCheck } from "lucide-react"
import type { Message } from "@/lib/types"

interface MessageBubbleProps {
  message: Message
  isOwnMessage: boolean
}

export default function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-lg p-3 ${
          isOwnMessage ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div className="flex items-center justify-end mt-1 text-xs opacity-70">
          <span>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>

          {isOwnMessage && (
            <span className="ml-1">
              {message.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

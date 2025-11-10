import { MessageSquare } from "lucide-react"
import NewMessageButton from "./new-message-button"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <MessageSquare className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-xl font-bold mb-2">Your messages</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Connect with your classmates, professors, and study groups through private messages.
      </p>
      <div className="flex items-center gap-2">
        <NewMessageButton />
        <span className="text-sm">Start a new conversation</span>
      </div>
    </div>
  )
}

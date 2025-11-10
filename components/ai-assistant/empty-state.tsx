import { Sparkles } from "lucide-react"
import SuggestedPrompts from "./suggested-prompts"

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void
}

export default function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center p-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-6">
        <Sparkles className="h-8 w-8 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Your AI Learning Assistant</h2>
      <p className="text-foreground/70 mb-6">
        Get help with your studies, assignments, and exam preparation. I'm fine-tuned specifically for Nigerian
        university curriculum.
      </p>
      <div className="w-full mb-6">
        <h3 className="text-sm font-medium mb-3">Try asking about:</h3>
        <SuggestedPrompts onSelectPrompt={onSelectPrompt} />
      </div>
    </div>
  )
}

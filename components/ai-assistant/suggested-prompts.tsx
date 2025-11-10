"use client"

import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void
}

const suggestedPrompts = [
  {
    text: "Explain recursion with examples",
    category: "concept",
  },
  {
    text: "Help me understand database normalization",
    category: "concept",
  },
  {
    text: "What are the key sorting algorithms?",
    category: "concept",
  },
  {
    text: "How do I solve this calculus problem?",
    category: "homework",
  },
  {
    text: "Create a study plan for my exams",
    category: "exam",
  },
  {
    text: "Explain object-oriented programming principles",
    category: "concept",
  },
]

export default function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestedPrompts.map((prompt, index) => (
        <Button key={index} variant="outline" size="sm" className="text-xs" onClick={() => onSelectPrompt(prompt.text)}>
          <Lightbulb
            className={`h-3 w-3 mr-1 ${
              prompt.category === "concept"
                ? "text-blue-500"
                : prompt.category === "homework"
                  ? "text-purple-500"
                  : "text-green-500"
            }`}
          />
          {prompt.text}
        </Button>
      ))}
    </div>
  )
}

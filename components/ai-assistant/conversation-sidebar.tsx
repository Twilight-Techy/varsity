"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search, X, MessageSquare, BookOpen, GraduationCap, Clock } from "lucide-react"
import ConversationItem from "./conversation-item"

// Sample conversation data
const recentConversations = [
  {
    id: "1",
    title: "Help with recursion in data structures",
    preview: "I'm struggling to understand how recursion works in tree traversal...",
    date: "2 hours ago",
    category: "homework",
  },
  {
    id: "2",
    title: "Explain quantum computing basics",
    preview: "Can you explain the fundamental principles of quantum computing?",
    date: "Yesterday",
    category: "concept",
  },
  {
    id: "3",
    title: "Database normalization help",
    preview: "I need help understanding the different normal forms in database design...",
    date: "2 days ago",
    category: "homework",
  },
]

const savedConversations = [
  {
    id: "4",
    title: "Python sorting algorithms",
    preview: "Here are implementations of common sorting algorithms in Python...",
    date: "Last week",
    category: "concept",
  },
  {
    id: "5",
    title: "Calculus integration techniques",
    preview: "Let me explain the different methods for solving integration problems...",
    date: "2 weeks ago",
    category: "exam",
  },
]

interface ConversationSidebarProps {
  onClose: () => void
}

export default function ConversationSidebar({ onClose }: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="h-full bg-background border-r border-foreground/10 flex flex-col">
      <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
        <h2 className="font-semibold text-lg">AI Assistant</h2>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          onClick={() => window.location.reload()}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/60" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="recent" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mb-2 grid w-auto grid-cols-2">
          <TabsTrigger value="recent" className="text-xs">
            Recent
          </TabsTrigger>
          <TabsTrigger value="saved" className="text-xs">
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {recentConversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="saved" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {savedConversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t border-foreground/10">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="justify-start">
            <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
            <span className="text-xs">Study Guide</span>
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <GraduationCap className="mr-2 h-4 w-4 text-purple-500" />
            <span className="text-xs">Exam Prep</span>
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-xs">Assignment Help</span>
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <Clock className="mr-2 h-4 w-4 text-orange-500" />
            <span className="text-xs">Quick Answers</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
